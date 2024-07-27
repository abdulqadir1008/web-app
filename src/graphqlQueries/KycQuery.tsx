function IntializeKycQuery() {
  return `query{
  InitializeAadharKyc{
    transaction_id
    captchaImage 
  }
}`;
}
function AadhaarOtpQuery(transaction_id: string, captcha: string, aadhaar_number: string) {
  return `query {
  generateAadharOtp(
    aadharVerificationInput: {
      transaction_id: "${transaction_id}"
      captcha: "${captcha}"
      aadhaar_number: "${aadhaar_number}"
    }
  ) {
    message
  }
}`;
}
function ValidateAadhaar(aadhar_id: string, transaction_id: string, otp: string) {
  return `query {
  validateAadharOtp(
    aadhar_id: "${aadhar_id}"

    transaction_id: "${transaction_id}"

    otp: "${otp}"
  ) {
    message
  }
}
`;
}
function AadharKycReloadCaptchaQuery(transaction_id: string) {
  return `
  query {
  AadharKycReloadCaptcha(transaction_id: "${transaction_id}") {
    transaction_id
    captchaImage
  }
}
  `;
}
function PanQuery(pan: string) {
  return `query {
  loadPanCard(pan_id: "${pan}") {
    message
  }
}
`;
}
function DrivingLicenseQuery(drivingLicense: string) {
  return `query {
  loadDrivingLicense(driving_license_id: "${drivingLicense}") {
    message
  }
}`;
}
function KycStatusQuery() {
  return `query {
  kycVerificationStatusDetails {
    aadhar_id
    pan_id
    driving_license_id
    aadhar_status
    pan_status
    driving_license_status
  }
}`;
}
export { IntializeKycQuery, AadhaarOtpQuery, ValidateAadhaar, AadharKycReloadCaptchaQuery, DrivingLicenseQuery, PanQuery, KycStatusQuery };
