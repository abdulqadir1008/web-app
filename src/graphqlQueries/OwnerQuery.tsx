function OwnerSignUpQuery (formValues:any) {
    return(
        `
      mutation{
 createOwnerProfile(input:{
        display_name:"${formValues.displayName}",
        full_name: "${formValues.fullName}",
        email_id: "${formValues.email}",
        phone_number: "${formValues.phoneNumber}",
        password:"${formValues.password}"
  }){
    access_token
    refresh_token
  }
}
        `
    )
}
function OwnerLoginQuery (login_id:any , password:any) {
    return(
        `
        mutation{
    ownerLogin(ownerLoginDetails:{
    login_id:"${login_id}",
    password: "${password}" 
  }){
    refresh_token
    access_token
  }
}`
    )
}
function OwnerDetailsUpdateQuery(FullName?: any, DisplayName?: any, EmailId?: any, PhoneNumber?: any) {
  return `mutation {
  UpdateOwner(
    UpdateOwnerDetailsInput: {
      full_name:"${FullName}"
      display_name:"${DisplayName}"
      email_id:"${EmailId}"
      phone_number:"${PhoneNumber}"
    }
  ) {
    full_name
    display_name
   email_id
    phone_number
    
  }
}
`;
}
function OwnerGetCarsQuery () {
    return(
         `query{
  getOwnerCars{
    car_number
    company_name
    model
  }
}`
    )
}
function OwnerGetAllLIstingsQuery (SelectedCar:any){
    return(
         `query{
  getAllListings(car_id: "${SelectedCar?.car_id}"){
    listing_start_date
    listing_end_date
    listing_id
  }
}` 
    )
}
function OwnerGetListingBookingsQuery (listing_id:any) {
    return (
         `query{
  getListingBookings(listing_id:"${listing_id}"){
    car_number
    customer_name
    owner_name
    start_date
    end_date
  }
}`
    )
}
function GetOwnerDetailsQuery (){
  return `query{
    getOwnerDetails{
      full_name
      display_name
      email_id
      phone_number
    }
  }`;
}
function CreateListing(CarNumber:string, StartValue:any, EndValue:any, LatLng:any) {
  return `
        mutation{
        createListing(car_number: "${CarNumber}", listingDetails: {
        listing_start_date: ${JSON.stringify(StartValue)}
        listing_end_date: ${JSON.stringify(EndValue)}
        listing_location: "${LatLng.address}"
        }){
        listing_start_date
        listing_end_date
        }
        }`;
}
export { OwnerSignUpQuery, OwnerLoginQuery, OwnerGetCarsQuery, OwnerGetAllLIstingsQuery, OwnerGetListingBookingsQuery, OwnerDetailsUpdateQuery, GetOwnerDetailsQuery, CreateListing };