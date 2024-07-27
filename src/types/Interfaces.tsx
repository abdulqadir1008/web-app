export interface I_RegistrationFormData {
  display_name: string;
  full_name: string;
  phone_number: number;
  password: string;
  email_id: string;
}
export interface I_LoginForm {
  login_id: string;
  password: string;
}

export interface I_CarRegistrationFormData {
  car_number?: string;
  owner_phone_number?: string;
  company_name?: string;
  model?: string;
  car_type?: string;
  transmission_type?: string;
  no_of_gears?: string;
  car_rating?: string;
  fuel_type?: string;
  air_conditioner?: string;
  seating_capacity?: string;
  year_of_manufacturing?: string;
  wheels_type?: string;
  panaromic_sunroof?: string;
  fuel_tank_capacity?: string;
  ventilated_seats?: string;
  led_screen?: string;
  back_camera?: string;
  air_bags?: string;
  color?: string;
  km_driven?: string;
  back_sensors?: string;
}

export interface I_carData {
  car_id?: string;
  model?: string;
  color?: string;
  car_type?: string;
  fuel_type?: string;
  company_name?: string;
  transmission_type?: string;
  year_of_manufacturing?: string;
  images?: string;
  seating_capacity?: string;
  base_price?: number;
  km_driven?: string;
  distance?: any;
}

export interface I_gstDetails {
  gst_number: string;
  gst_firm_name: string;
  gst_firm_address: string;
}
export interface I_CarDetail_Car_Data {
  car_id?: number;
  company_name?: string;
  model?: string;
  transmission_type?: string;
  fuel_type?: string;
  year_of_manufacturing?: number;
  images?: any;
  city?: string;
  base_price?: number;
  seating_capacity?: string;
  base_insurance?: number;
  total_protection_insurance?: number;
  distance?: number;
}
export interface I_Coupon_List {
  active_coupons?: string[];
  used_coupons?: string[];
  expired_coupons?: string[];
}
