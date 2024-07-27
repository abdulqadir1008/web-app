import dayjs from 'dayjs';
import { DateTimeFormatter } from '../Common/DateTimeFormatter';

function createCarDetailsQuery(formData: any) {
  const {
    car_number,
    owner_phone_number,
    company_name,
    model,
    car_type,
    transmission_type,
    no_of_gears,
    car_rating,
    fuel_type,
    air_conditioner,
    seating_capacity,
    year_of_manufacturing,
    wheels_type,
    panaromic_sunroof,
    fuel_tank_capacity,
    ventilated_seats,
    led_screen,
    back_camera,
    air_bags,
    color,
    km_driven,
    back_sensors
  } = formData;

  return `mutation {
  createCarDetails(
    carDetails: {
      car_number:"${car_number.toUpperCase()}"
      company_name:"${company_name}"
      owner_phone_number:"${owner_phone_number}"
      model:"${model}"
      car_type:${car_type.toUpperCase()}
      transmission_type:${transmission_type.toUpperCase()}
      no_of_gears:${no_of_gears.toUpperCase()}
      car_rating:${car_rating.toUpperCase()}
      fuel_type:${fuel_type.toUpperCase()}
      air_conditioner:${air_conditioner.toUpperCase()}
      seating_capacity:${seating_capacity.toUpperCase()}
      year_of_manufacturing:${year_of_manufacturing}
      wheels_type:${wheels_type.toUpperCase()}
      panaromic_sunroof:${panaromic_sunroof.toUpperCase()}
      fuel_tank_capacity:${fuel_tank_capacity}
      ventilated_seats:${ventilated_seats.toUpperCase()}
      led_screen:${led_screen.toUpperCase()}
      back_camera:${back_camera.toUpperCase()}
      air_bags:${air_bags.toUpperCase()}
      color:"${color}"
      km_driven:${km_driven}
      back_sensors:${back_sensors.toUpperCase()}
    }
  ) {
    car_id
  }
  }`;
}
function getCarDetailsQuery(car_id: string, starts: any, ends: any) {
  const start_date = DateTimeFormatter(starts)
  const end_date = DateTimeFormatter(ends)
  return `query{getCarDetails(car_id: "${car_id}",
      dateInputs: { start_date: "${start_date}"  end_date: "${end_date}"}){
        car_id,
        company_name,
        model,
        car_type,
        transmission_type,
        no_of_gears,
        fuel_type,
        seating_capacity,
        year_of_manufacturing,
        wheels_type,
        panaromic_sunroof,
        fuel_tank_capacity,
        ventilated_seats,
        led_screen,
        back_camera,
        air_bags,
        color,
        images,
        km_driven,
        back_sensors,
        city,
        base_price,
        distance,
        base_insurance,
        total_protection_insurance
      }
    }`;
}
function getAllCarsQuery() {
  return `query{
  getAllCars{
    car_id
    company_name
    model
    color
    car_type
    fuel_type
    transmission_type
  }
}`;
}
function getAvailableCarsQuery(starts: any, ends: any, lat: any, lng: any, sortBy: string, filterValue: object) {
  const start_date = DateTimeFormatter(starts);
  const end_date = DateTimeFormatter(ends);

  const filter = JSON.stringify(filterValue).replace(/"/g, '');
  return `query{
        getAvailableCars(
          sortByInput: {sortBy: ${sortBy}},
          filterByInput: ${filter},
          dateInputs:{
          start_date:"${start_date}"
          end_date:"${end_date}"
        },location: {lats: "${lat}", longs:"${lng}"}){
          car_id,
          model, 
          images, 
          color, 
          company_name, 
          transmission_type, 
          fuel_type,
          car_type, 
          year_of_manufacturing,
          seating_capacity,
          base_price,
          distance,
          car_status,
          km_driven
        }
      }`;
}

export { createCarDetailsQuery, getCarDetailsQuery, getAllCarsQuery, getAvailableCarsQuery };
