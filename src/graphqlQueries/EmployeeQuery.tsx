function EmployeeSignUpQuery(formValues: any) {
  return `mutation{
          createEmployeeProfile(input:{
            employee_type:[${formValues.employeeType}]
            full_name:"${formValues.fullName}"
            display_name:"${formValues.displayName}"
            email_id:"${formValues.email}"
            phone_number:"${formValues.phoneNumber}"
            password:"${formValues.password}"
          })
          {
            access_token
            refresh_token
          }
        }`;
}
function EmployeeLoginQuery(login_id: any, password: any) {
  return `
        mutation{
   employeeLogin(employeeLoginDetails:{
    login_id:"${login_id}",
    password:"${password}" 
  }){
    refresh_token
    access_token
    full_name
    display_name
    phone_number
  }
}`;
}


export { EmployeeSignUpQuery, EmployeeLoginQuery };
