/**********************************************************************
 * computeReturnSummary(data)
 * -------------------------------------------------------------
 *  data  ─┬→ the big object you get in response.data
 *         └→  (NOT the outer wrapper that also carries status / message)
 *
 *  returns
 *    {
 *      A: number,   // taxable income
 *      B: number,   // non-taxable wealth additions
 *      C: number,   // tax paid / deducted
 *      D: number,   // closing wealth
 *      E: number,   // net closing assets
 *      delta: number  // D – E   (+ve: more wealth than assets, –ve opposite)
 *    }
 *********************************************************************/
export function computeReturnSummary(data) {
  /* ---------- small helpers ---------- */
  const num = (v) => (v ? Number(v) : 0); // safe numeric cast
  const sum = (arr) => arr.reduce((t, x) => t + num(x), 0); // simple summer
  const pick = (obj, keys) => sum(keys.map((k) => num(obj?.[k])));

  /* ---------- 1.  Taxable income (A) ---------- */
  const { incomeTab = {}, wealthStatementTab = {} } = data;

  /* Salary income */
  const salaryInc = (() => {
    const s = incomeTab.salaryIncome;
    if (!s) return 0;
    const vehiclePerq = s.employerVehicleYN
      ? num(s.employerVehicleCostPKR) * 0.05
      : 0;
    return (
      num(s.annualTaxableSalaryPKR) + num(s.otherAllowancesPKR) + vehiclePerq
    );
  })();

  /* Rental: rent – expenses                                          */
  const rentalInc = (() => {
    const r = incomeTab.rentalIncome;
    if (!r) return 0;
    return num(r.rentReceivedPKR) - num(r.propertyExpensesPKR);
  })();

  /* Pension */
  const pensionInc = num(incomeTab.pensionIncome?.annualPensionPKR);

  /* Business, Profession, Freelancer, Commission, etc.
     Each has an array of “revenue” objects and an expense sheet.
     We just sum all ‘amount’ and subtract totalDirectExpense & friends.   */
  const complexSource = (
    bucket,
    revenueKey,
    expenseSheetName = "expenseSheetJson"
  ) =>
    (() => {
      const obj = incomeTab[bucket];
      if (!obj) return 0;
      const revArr = obj[revenueKey] || [];
      const revenue = sum(revArr.map((r) => num(r.amount)));
      const expObj = obj[expenseSheetName] || {};
      // sum all numeric values in the expense object
      const expenses = Object.values(expObj).reduce((t, v) => t + num(v), 0);
      return revenue - expenses;
    })();

  const businessInc = complexSource("businessIncome", "businessRevenueJson");
  const professionInc = complexSource(
    "professionIncome",
    "professionRevenueJson"
  );
  const freelancerInc = complexSource(
    "freelancerIncome",
    "freelanceRevenueJson"
  );
  const commissionInc = (() => {
    const c = incomeTab.commissionIncome;
    if (!c) return 0;
    const grab = (key) => {
      const block = c[key];
      if (!block) return 0;
      return num(block[`${key}Income`]) - num(block[`${key}Expense`]);
    };
    return (
      grab("lifeInsuranceAgentJson") +
      grab("generalInsuranceAgentJson") +
      grab("realEstateTravelAgentJson") +
      grab("otherCommissionJson")
    );
  })();

  /* Profit on savings */
  const savingInc = (() => {
    const srcNames = [
      "bankDeposits",
      "behbood",
      "govtScheme",
      "pensionerBenefits",
    ];
    const po = incomeTab.profitOnSavingsIncome; // not present in JSON, placeholder
    return po ? pick(po, srcNames) : 0;
  })();

  /* Sale of property: gain = Σ(sale – purchase) */
  const propGain = (() => {
    const arr = incomeTab.propertySaleIncome || [];
    return sum(arr.map((p) => num(p.salePricePKR) - num(p.purchasePricePKR)));
  })();

  /* Agriculture */
  const agriInc = num(incomeTab.agricultureIncome?.annualAgriIncomePkr);

  /* Partnership/AOP profit -- array */
  const aopInc = sum(
    (incomeTab.partnershipIncome || []).map((p) => num(p.profitSharePKR))
  );

  /* Dividends & capital gain */
  const divCapInc = (() => {
    const d = incomeTab.dividendCapitalGainIncome;
    if (!d) return 0;
    const divTot = sum(
      d.dividendIncomeJson?.companies.map((c) => num(c.dividendAmount)) || []
    );
    const cg = d.capitalGainJson || {};
    /* shares + mf + mu */
    const capGainTot = pick(cg, [
      "capitalGainShares",
      "capitalGainMutualFunds",
      "capitalGainMutualUnits",
    ]);
    return divTot + capGainTot;
  })();

  /* Other incomes (simple array) */
  const otherInc = sum(
    (incomeTab.otherIncomes || []).map((o) => num(o.amountPKR))
  );

  /* A = sum of all heads calculated above */
  const A =
    salaryInc +
    rentalInc +
    pensionInc +
    businessInc +
    professionInc +
    freelancerInc +
    commissionInc +
    savingInc +
    propGain +
    agriInc +
    aopInc +
    divCapInc +
    otherInc;

  /* ---------- 2.  Non-taxable inflows (B) ---------- */
  const B = (() => {
    const s = incomeTab.salaryIncome;
    if (!s) return 0;
    return (
      num(s.taDaPKR) +
      num(s.providentFundAmountPKR) +
      num(s.providentGratuityWithdrawalPKR)
    );
  })();

  /* ---------- 3.  Tax paid / withheld at source (C) ---------- */
  const C = (() => {
    let total = 0;

    // salary
    total += num(incomeTab.salaryIncome?.taxDeductedByEmployerPKR);

    // rental
    total += num(incomeTab.rentalIncome?.taxDeductedByTenantPKR);

    // commission blocks carry XYZTaxDeduction
    const comm = incomeTab.commissionIncome;
    if (comm) {
      [
        "lifeInsuranceAgentJson",
        "generalInsuranceAgentJson",
        "realEstateTravelAgentJson",
        "otherCommissionJson",
      ].forEach(
        (k) => (total += num(comm[k]?.[`${k.slice(0, -4)}TaxDeduction`]))
      ); // ugly but works
    }

    // dividend / capital gain
    const d = incomeTab.dividendCapitalGainIncome;
    if (d) {
      total += sum(
        d.dividendIncomeJson?.companies.map((c) => num(c.taxDeducted)) || []
      );
      total += num(d.capitalGainJson?.capitalGainTaxDeduction);
    }

    // bank transfers, vehicle, utilities, property etc.
    const catSum = (arr, key) => sum((arr || []).map((o) => num(o[key])));
    const ded = data.deductionsTab || {};
    total += catSum(ded.bankDeductions, "taxDeductedPKR");
    total += catSum(ded.vehicleDeductions, "taxDeductedPKR");
    total += catSum(ded.utilitiesDeductions, "taxDeductedPKR");
    total += catSum(ded.propertyDeductions, "taxPaidPKR");

    // “other deductions” block
    total += pick(ded.otherDeductions || {}, [
      "eduInstitutionFeeTaxPKR",
      "airTicketsTaxPKR",
      "functionsGatheringTaxPKR",
      "withdrawalVpsFundsTaxPKR",
      "priorYearsRefundTaxPKR",
    ]);

    return total;
  })();

  /* ---------- 4.  Closing wealth (D) ---------- */
  const opening = num(wealthStatementTab.opening?.openingBalance);
  const personalExpenses = (() => {
    const e = wealthStatementTab.expense || {};
    return sum(Object.values(e));
  })();

  const D = opening + A + B - C - personalExpenses;

  /* ---------- 5.  Net assets (E) ---------- */
  const assetsTotal = (() => {
    const a = wealthStatementTab.assets || {};
    let t = 0;

    // generic helper to pull numeric field(s) out of each asset array
    const grab = (arr, field) => sum((arr || []).map((o) => num(o[field])));

    t += grab(a.cash, "totalCash");
    t += grab(a.other, "totalAmount");
    t += grab(a.vehicle, "vehiclesValue");
    t += grab(a.property, "propertiesValue");
    t += grab(a.insurance, "amountPaid");
    t += grab(a.bankAccount, "totalAmount");
    t += grab(a.possesssion, "totalCash");
    t += grab(a.foreignAssets, "totalAmount");
    t += grab(a.businessCapital, "totalCapital");

    return t;
  })();

  const liabilitiesTotal = (() => {
    const l = wealthStatementTab.liabilities || {};
    const grab = (arr, field) => sum((arr || []).map((o) => num(o[field])));
    let t = 0;
    t += grab(l.otherLiabilities, "amount");
    t += grab(l.BankLoanLiabilities, "amount");
    t += grab(l.EmployerLoanLiabilities, "amount");
    return t;
  })();

  const E = assetsTotal - liabilitiesTotal;

  /* ---------- result ---------- */
  return {
    taxableIncome_A: A,
    nonTaxableInflows_B: B,
    taxPaid_C: C,
    closingWealth_D: D,
    netAssets_E: E,
    delta_D_minus_E: D - E, // should be 0 if everything ties
    msg: "In this return, you have more wealth than assets.",
  };
}

/* ===== Example usage ===== */
// assuming your JSON blob is in a variable called rawResponse
// const result = computeReturnSummary(rawResponse.data);
// console.log(result);
