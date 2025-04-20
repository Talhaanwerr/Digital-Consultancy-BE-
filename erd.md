ERD of Digital Consultancy

User
1*. firstName     2*. lastName     3*. phone     4*. email     5*. status     6*. roleId     7*. otp     8*. otpExpiresAt     9*. password     10*. username     11*. imageUrl     12*. address     13*. cnic     14*. emailVerified     15*. dob     16*. gender     17*. rememberToken

Role
1. name(Super Admin/Admin/User)     2. description

IRIS Credentials
1. email     2. password     3. userId     4. cnic     5. fbrUsername

NTN Registration
1. telecom(ufone/jazz etc)     2. cnicFrontUrl     3. cnicBackUrl     4. userId     5. phone     6. applicationStatus(approved/rejected/requested/working)     7. invoiceStatus(paid/unpaid)     8. receiptImageUrl


Company Return Filing
1. taxYear     2. businessNature     3. businessType(partnership/Nonprofit Organisation/Private Limited)     4. applicationStatus(active/rejected/requested)     5. invoiceStatus(paid/unpaid)     6. receiptImageUrl     7. userId     8. bankStatementPdfUrl     
9. financialStatementPdfUrl     10. assignTo(user id)
     


Sales Tax
1. taxYear     2. taxMonth     3. userId     4. applicationStatus(active/rejected/requested)     5. invoiceStatus(paid/unpaid)     6. receiptImageUrl

Sale Invoices
1. userId     2. salesTaxId     3. invoiceUrls

Export Invoices
1. userId     2. salesTaxId     3. invoiceUrls



GST/PST Registeration
1. businessName     2. legalStatusOFBusiness(Company/partnership/Sole Proprietors)     3. email     4. businessStartDate     5. businessNature     6. electricityConsumerNumber     7. bankMaintenanceCertificatePdfUrl     8. latestUtilityBillImageUrl     9. utilityMeterImageUrl     10. letterHeadImageUrl     11. RentAgreementImageUrl     12. applicationStatus(active/rejected/requested)     13. invoiceStatus(paid/unpaid)     14. receiptImageUrl

GPS Tagged Photos
1. userId     2. gstPstRegistrationId     3. imageUrl

GST/PST CNIC's
1. userId     2. gstPstRegistrationId     3. cnicImageUrl


FAQ's
1. question     2. answer