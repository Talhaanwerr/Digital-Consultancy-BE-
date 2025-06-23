

export const individualTaxReturn = {
    "status": true,
    "message": "Individual tax return retrieved successfully",
    "data": {
        "id": 17,
        "filingFor": "Self",
        "taxYear": "2025",
        "applicationStatus": "draft",
        "invoiceStatus": null,
        "receiptImageUrl": null,
        "status": "incomplete",
        "createdAt": "2025-06-19T18:32:22.000Z",
        "updatedAt": "2025-06-20T12:44:29.000Z",
        "user": {
            "id": 21,
            "firstName": "Abdul",
            "lastName": "Rafay",
            "email": "test@gmail.com",
            "phone": "1234567891234",
            "cnic": "3449173846777"
        },
        "infoTab": {
            "basicInfo": {
                "id": 11,
                "individualTaxReturnId": 17,
                "isPakistaniNational": true,
                "fullName": "Abdul678 Rafay",
                "email": "test@gmail.com",
                "identifierType": "CNIC",
                "identifierNumber": "1234567891234",
                "createdAt": "2025-06-19T19:23:54.000Z",
                "updatedAt": "2025-06-20T12:44:29.000Z"
            },
            "personalInfo": {
                "id": 11,
                "individualTaxReturnId": 17,
                "occupation": "Private Employee",
                "isResidentForTaxYear": true,
                "createdAt": "2025-06-19T19:23:54.000Z",
                "updatedAt": "2025-06-20T12:44:29.000Z"
            },
            "fbrInfo": {
                "id": 11,
                "individualTaxReturnId": 17,
                "isFbrRegistered": true,
                "cnicOrNtnNumber": "1234512345671",
                "irisPassword": "password123",
                "nicFrontUrl": "",
                "nicBackUrl": "",
                "createdAt": "2025-06-19T19:23:54.000Z",
                "updatedAt": "2025-06-20T12:44:29.000Z"
            }
        },
        "incomeTab": {
            "incomeSources": [
                {
                    "id": 1,
                    "name": "Salary",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 2,
                    "name": "Business",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 3,
                    "name": "Pension",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 4,
                    "name": "Rental",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 5,
                    "name": "Freelancer",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 6,
                    "name": "Profession",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 7,
                    "name": "Profit on Saving",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 8,
                    "name": "Sale of Property",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 9,
                    "name": "Agriculture Income",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 10,
                    "name": "Commision Income",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 11,
                    "name": "Partnership/ AOP",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 12,
                    "name": "Dividend Income/ Capital Gain",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                },
                {
                    "id": 13,
                    "name": "Other Income",
                    "createdAt": "2025-05-19T03:03:15.000Z",
                    "updatedAt": "2025-05-19T03:03:15.000Z"
                }
            ],
            "salaryIncome": {
                "id": 6,
                "individualTaxReturnId": 17,
                "annualTaxableSalaryPKR": "1200000.00",
                "taxDeductedByEmployerPKR": "80000.00",
                "taDaPKR": "50000.00",
                "employerFreeMedicalYN": true,
                "medicalAllowancePKR": "0.00",
                "providentFundYN": true,
                "providentFundAmountPKR": "100000.00",
                "employerVehicleYN": false,
                "employerVehicleCostPKR": "0.00",
                "otherAllowancesPKR": "25000.00",
                "providentGratuityWithdrawalPKR": "0.00",
                "taxBorneByEmployerYN": false,
                "createdAt": "2025-06-21T08:07:17.000Z",
                "updatedAt": "2025-06-21T08:07:17.000Z"
            },
            "pensionIncome": {
                "id": 2,
                "individualTaxReturnId": 17,
                "annualPensionPKR": "600000.00",
                "createdAt": "2025-06-21T08:55:45.000Z",
                "updatedAt": "2025-06-21T08:55:45.000Z"
            },
            "rentalIncome": {
                "id": 2,
                "individualTaxReturnId": 17,
                "rentReceivedPKR": "800000.00",
                "taxDeductedByTenantPKR": "40000.00",
                "propertyExpensesPKR": "120000.00",
                "createdAt": "2025-06-21T08:56:03.000Z",
                "updatedAt": "2025-06-21T08:56:03.000Z"
            },
            "propertySaleIncome": [
                {
                    "id": 2,
                    "individualTaxReturnId": 17,
                    "propertyType": "Constructed plot",
                    "purchaseDate": "2020-01-15T00:00:00.000Z",
                    "saleDate": "2023-06-30T00:00:00.000Z",
                    "purchasePricePKR": "5000000.00",
                    "salePricePKR": "7500000.00",
                    "propertyAddress": "123 Test Street, Test City",
                    "advanceTaxChallanUrl": "https://example.com/challan.pdf",
                    "createdAt": "2025-06-21T08:56:35.000Z",
                    "updatedAt": "2025-06-21T08:56:35.000Z"
                }
            ],
            "agricultureIncome": {
                "id": 3,
                "individualTaxReturnId": 17,
                "annualAgriIncomePkr": "2500000.00",
                "createdAt": "2025-06-21T08:56:48.000Z",
                "updatedAt": "2025-06-21T08:56:48.000Z"
            },
            "partnershipIncome": [
                {
                    "id": 2,
                    "individualTaxReturnId": 17,
                    "partnershipName": "Test Partnership Firm",
                    "profitSharePKR": "1500000.00",
                    "partnerCapitalPKR": "3000000.00",
                    "createdAt": "2025-06-21T13:08:54.000Z",
                    "updatedAt": "2025-06-21T13:08:54.000Z"
                }
            ],
            "freelancerIncome": {
                "id": 3,
                "individualTaxReturnId": 17,
                "earnsAbroadITYN": true,
                "registeredWithPsebYN": false,
                "freelanceRevenueJson": [
                    {
                        "rate": 0.15,
                        "amount": 800000,
                        "deductedAmount": 200000,
                        "notDeductedAmount": 10000
                    },
                    {
                        "rate": 0.15,
                        "amount": 800000,
                        "deductedAmount": 200000,
                        "notDeductedAmount": 10000
                    }
                ],
                "expenseSheetJson": {
                    "rent": 15000,
                    "depreciation": 6000,
                    "legalProfessional": 3500,
                    "repairMaintenance": 4000,
                    "totalDirectExpense": 70000,
                    "otherIndirectExpense": 2500,
                    "salariesWagesBenefits": 30000,
                    "travelingCommunication": 5000
                },
                "balanceSheetJson": {
                    "otherAssets": 12000,
                    "totalAssets": 250000,
                    "totalCapital": 110000,
                    "tradeCreditors": 12000,
                    "cashBankBalance": 50000,
                    "advancesDeposits": 10000,
                    "otherLiabilities": 10000,
                    "totalLiabilities": 140000,
                    "longTermBorrowing": 80000,
                    "equipmentFurniture": 80000,
                    "otherBusinessExpense": 4000,
                    "freightTransportation": 7000
                },
                "otherAdjustableTaxJson": {
                    "advanceTaxPaid": 7000,
                    "earlierTurnoverTax": 3000,
                    "commercialElectricity": 2000,
                    "industrialElectricity": 3500
                },
                "notDeductedAmount": "0.00",
                "createdAt": "2025-06-21T09:03:58.000Z",
                "updatedAt": "2025-06-21T09:03:58.000Z"
            },
            "professionIncome": {
                "id": 2,
                "individualTaxReturnId": 17,
                "profession": "Doctor",
                "professionRevenueJson": [
                    {
                        "rate": 0.15,
                        "amount": 900000,
                        "deductedAmount": 250000,
                        "notDeductedAmount": 15000
                    },
                    {
                        "rate": 0.15,
                        "amount": 900000,
                        "deductedAmount": 250000,
                        "notDeductedAmount": 15000
                    }
                ],
                "expenseSheetJson": {
                    "rent": 20000,
                    "utilities": 5000,
                    "depreciation": 6000,
                    "legalProfessional": 3500,
                    "repairMaintenance": 3000,
                    "totalDirectExpense": 80000,
                    "otherIndirectExpense": 2500,
                    "salariesWagesBenefits": 40000,
                    "travelingCommunication": 7000
                },
                "balanceSheetJson": {
                    "otherAssets": 10000,
                    "totalAssets": 300000,
                    "stocksStores": 15000,
                    "totalCapital": 120000,
                    "plantMachinery": 90000,
                    "tradeCreditors": 9000,
                    "cashBankBalance": 60000,
                    "advancesDeposits": 10000,
                    "otherLiabilities": 8000,
                    "longTermBorrowing": 70000,
                    "otherBusinessExpense": 5000,
                    "freightTransportation": 6000
                },
                "otherAdjustableTaxJson": {
                    "advanceTaxPaid": 7500,
                    "earlierTurnoverTax": 4000,
                    "commercialElectricity": 3000,
                    "industrialElectricity": 4500
                },
                "notDeductedAmount": "0.00",
                "createdAt": "2025-06-21T09:22:04.000Z",
                "updatedAt": "2025-06-21T09:22:04.000Z"
            },
            "commissionIncome": {
                "id": 2,
                "individualTaxReturnId": 17,
                "lifeInsuranceAgentJson": {
                    "lifeInsuranceIncome": 500000,
                    "lifeInsuranceExpense": 40000,
                    "lifeInsuranceTaxDeduction": 75000
                },
                "generalInsuranceAgentJson": {
                    "generalInsuranceIncome": 300000,
                    "generalInsuranceExpense": 20000,
                    "generalInsuranceTaxDeduction": 45000
                },
                "realEstateTravelAgentJson": {
                    "realEstateIncome": 700000,
                    "realEstateExpense": 50000,
                    "realEstateTaxDeduction": 100000
                },
                "otherCommissionJson": {
                    "otherCommissionIncome": 150000,
                    "otherCommissionExpense": 10000,
                    "otherCommissionTaxDeduction": 25000
                },
                "createdAt": "2025-06-20T07:46:46.000Z",
                "updatedAt": "2025-06-21T09:00:38.000Z"
            },
            "dividendCapitalGainIncome": {
                "id": 2,
                "individualTaxReturnId": 17,
                "dividendIncomeJson": {
                    "companies": [
                        {
                            "name": "ABC Ltd",
                            "taxDeducted": 3750,
                            "dividendAmount": 25000
                        },
                        {
                            "name": "XYZ Corp",
                            "taxDeducted": 2700,
                            "dividendAmount": 18000
                        }
                    ]
                },
                "capitalGainJson": {
                    "capitalGainShares": 120000,
                    "capitalGainMutualFunds": 30000,
                    "capitalGainMutualUnits": 40000,
                    "capitalGainTaxDeduction": 18000
                },
                "nccplStatementUrl": "/path/to/nccpl-statement.pdf",
                "mutualFundsReportUrl": "/path/to/mutual-funds-report.pdf",
                "createdAt": "2025-06-20T18:33:15.000Z",
                "updatedAt": "2025-06-21T09:24:05.000Z"
            },
            "businessIncome": {
                "id": 2,
                "individualTaxReturnId": 17,
                "businessTypesJson": [
                    "Manufacturer"
                ],
                "businessRevenueJson": [
                    {
                        "rate": 0.15,
                        "amount": 500000,
                        "deductedAmount": 100000,
                        "notDeductedAmount": 12000
                    },
                    {
                        "rate": 0.15,
                        "amount": 600000,
                        "deductedAmount": 120000,
                        "notDeductedAmount": 14000
                    }
                ],
                "expenseSheetJson": {
                    "rent": 10000,
                    "salaries": 20000,
                    "utilities": 6000,
                    "rentExpense": 12000,
                    "depreciation": 7000,
                    "otherExpenses": 3000,
                    "costOfGoodsSold": 50000,
                    "totalDirectExpense": 80000,
                    "legalAndProfessional": 4500,
                    "otherIndirectExpense": 2000,
                    "repairAndMaintenance": 3500,
                    "salariesWagesBenefits": 25000,
                    "freightAndTransportation": 5000,
                    "travelingAndCommunication": 4000
                },
                "balanceSheetJson": {
                    "otherAssets": 10000,
                    "totalAssets": 200000,
                    "cashBankBalance": 40000,
                    "otherLiabilities": 5000,
                    "totalLiabilities": 120000,
                    "stocksStoresSpares": 18000,
                    "totalCapitalAmount": 80000,
                    "longTermLiabilities": 70000,
                    "plantMachineryEquipment": 60000,
                    "otherBusinessExpenseAssets": 3000,
                    "advancesDepositsPrepayments": 15000,
                    "freightAndTransportationAssets": 7000
                },
                "otherAdjustableTaxJson": {
                    "advanceTaxPaid": 5000,
                    "earlierTurnoverTax": 2000,
                    "purchasedByRetailers": 1800,
                    "commercialElectricityBill": 1500,
                    "industrialElectricityBill": 2500
                },
                "notDeductedAmount": "0.00",
                "createdAt": "2025-06-21T08:39:20.000Z",
                "updatedAt": "2025-06-21T08:39:20.000Z"
            },
            "otherIncomes": [
                {
                    "id": 7,
                    "individualTaxReturnId": 17,
                    "incomeType": "Gifts",
                    "amountPKR": "500000.00",
                    "description": "Wedding gift from uncle",
                    "createdAt": "2025-06-21T09:25:23.000Z",
                    "updatedAt": "2025-06-21T09:25:23.000Z"
                },
                {
                    "id": 8,
                    "individualTaxReturnId": 17,
                    "incomeType": "Inheritance",
                    "amountPKR": "1200000.00",
                    "description": "Inheritance from grandparent",
                    "createdAt": "2025-06-21T09:25:23.000Z",
                    "updatedAt": "2025-06-21T09:25:23.000Z"
                }
            ]
        },
        "deductionsTab": {
            "categories": [
                {
                    "id": 4,
                    "name": "Property",
                    "createdAt": "2025-06-01T01:06:27.000Z",
                    "updatedAt": "2025-06-01T01:06:27.000Z"
                },
                {
                    "id": 5,
                    "name": "Others",
                    "createdAt": "2025-06-01T01:06:27.000Z",
                    "updatedAt": "2025-06-01T01:06:27.000Z"
                }
            ],
            "bankDeductions": [
                {
                    "id": 46,
                    "individualTaxReturnId": 17,
                    "transactionType": "Bank Transfers",
                    "bankName": "Al Baraka Bank (Pakistan) Limited",
                    "taxDeductedPKR": "313.00",
                    "bankAccountNumber": "23",
                    "createdAt": "2025-06-19T18:33:21.000Z",
                    "updatedAt": "2025-06-19T18:33:21.000Z"
                }
            ],
            "vehicleDeductions": [
                {
                    "id": 41,
                    "individualTaxReturnId": 17,
                    "vehicleTaxType": "Registration",
                    "vehicleType": "Other",
                    "taxDeductedPKR": "414.00",
                    "vehicleRegNumber": "14",
                    "createdAt": "2025-06-19T18:49:44.000Z",
                    "updatedAt": "2025-06-19T18:49:44.000Z"
                },
                {
                    "id": 42,
                    "individualTaxReturnId": 17,
                    "vehicleTaxType": "Registration",
                    "vehicleType": "Jeep",
                    "taxDeductedPKR": "4.00",
                    "vehicleRegNumber": "134",
                    "createdAt": "2025-06-19T18:49:44.000Z",
                    "updatedAt": "2025-06-19T18:49:44.000Z"
                }
            ],
            "utilitiesDeductions": [
                {
                    "id": 16,
                    "individualTaxReturnId": 17,
                    "utilityType": "Internet",
                    "providerName": "ada",
                    "taxDeductedPKR": "4242.00",
                    "consumerRefNo": "424",
                    "createdAt": "2025-06-19T18:49:44.000Z",
                    "updatedAt": "2025-06-19T18:49:44.000Z"
                }
            ],
            "propertyDeductions": [
                {
                    "id": 13,
                    "individualTaxReturnId": 17,
                    "transactionType": "Purchase",
                    "propertyAddress": "asd",
                    "areaValue": "44.00",
                    "areaUnit": "Sq. Foot",
                    "taxPaidPKR": "13.00",
                    "createdAt": "2025-06-19T18:49:44.000Z",
                    "updatedAt": "2025-06-19T18:49:44.000Z"
                }
            ],
            "otherDeductions": {
                "id": 5,
                "individualTaxReturnId": 17,
                "eduInstitutionFeeTaxPKR": "535.00",
                "airTicketsTaxPKR": "0.00",
                "functionsGatheringTaxPKR": "0.00",
                "withdrawalVpsFundsTaxPKR": "0.00",
                "priorYearsRefundTaxPKR": "0.00",
                "createdAt": "2025-06-19T18:33:22.000Z",
                "updatedAt": "2025-06-20T09:36:20.000Z"
            }
        },
        "taxBenefitsTab": null,
        "wealthStatementTab": {
            "id": 9,
            "individualTaxReturnId": 17,
            "opening": {
                "openingBalance": 100000
            },
            "assets": {
                "cash": [
                    {
                        "totalCash": 50000
                    }
                ],
                "other": [
                    {
                        "description": "Art Collection",
                        "totalAmount": 400000
                    }
                ],
                "vehicle": [
                    {
                        "vehiclesValue": 2500000,
                        "numberOfVehicle": 1,
                        "vehiclesDescription": "Toyota Corolla"
                    }
                ],
                "property": [
                    {
                        "propertiesValue": 5000000,
                        "numberOfProperties": 2,
                        "propertiesDescription": "Residential Plot"
                    }
                ],
                "insurance": [
                    {
                        "amountPaid": 150000,
                        "companyName": "State Life Insurance",
                        "policyNumber": "POL123456"
                    }
                ],
                "bankAccount": [
                    {
                        "bankNames": "ABC Bank",
                        "totalAmount": 750000,
                        "numberOfAccounts": 2
                    }
                ],
                "possesssion": [
                    {
                        "totalCash": 200000,
                        "possesssionDescription": "Gold Jewelry"
                    }
                ],
                "foreignAssets": [
                    {
                        "totalAmount": 1000000,
                        "assetsDescription": "UK Bank Account"
                    }
                ],
                "businessCapital": [
                    {
                        "businessName": "Tech Solutions",
                        "totalCapital": 3000000,
                        "numberOfBusiness": 1
                    }
                ]
            },
            "liabilities": {
                "otherLiabilities": [
                    {
                        "amount": 150000,
                        "description": "Personal Loan to Friend"
                    }
                ],
                "BankLoanLiabilities": [
                    {
                        "amount": 1000000,
                        "bankName": "XYZ Bank"
                    }
                ],
                "EmployerLoanLiabilities": [
                    {
                        "amount": 200000,
                        "description": "Advance Salary"
                    }
                ]
            },
            "expense": {
                "rentExpenses": 250000,
                "taxesExpenses": 50000,
                "familyExpenses": 300000,
                "medicalExpenses": 60000,
                "vehicleExpenses": 80000,
                "gatheringExpenses": 20000,
                "householdExpenses": 400000,
                "telephoneExpenses": 10000,
                "electricityExpenses": 30000
            },
            "createdAt": "2025-06-20T10:06:12.000Z",
            "updatedAt": "2025-06-20T10:16:39.000Z"
        }
    }
}