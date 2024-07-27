import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { kMaxLength } from 'buffer';
import React, { useEffect, useState } from 'react';

import { resolvePostApiWithHeaders } from '../Common/ResolveApi';
import { getCookie } from '../components/Cookies';
import { createCarDetailsQuery } from '../graphqlQueries/CarDetailsQuery';
import { I_CarRegistrationFormData } from '../types/Interfaces';

const CarRegistration = () => {
  const initialValues: I_CarRegistrationFormData = {
    car_number: '',
    owner_phone_number: '',
    company_name: '',
    model: '',
    car_type: '',
    transmission_type: '',
    no_of_gears: '',
    car_rating: '',
    fuel_type: '',
    air_conditioner: '',
    seating_capacity: '',
    year_of_manufacturing: '',
    wheels_type: '',
    panaromic_sunroof: '',
    fuel_tank_capacity: '',
    ventilated_seats: '',
    led_screen: '',
    back_camera: '',
    air_bags: '',
    color: '',
    km_driven: '',
    back_sensors: ''
  };

  const [FormData, setFormData] = useState<I_CarRegistrationFormData>(initialValues);
  const Token = getCookie('Employee_access_token');
  const getData = async (FormData: any) => {
    try {
      await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, createCarDetailsQuery(FormData), Token);
    } catch (error) {
      console.log(error);
    }
  };

  const CarTypes = [
    { value: 'SEDAN', label: 'Sedan' },
    { value: 'HATCHBACK', label: 'Hatchback' },
    { value: 'SUV', label: 'Suv' }
  ];

  const Transmissions = [
    { value: 'MANUAL', label: 'Manual' },
    { value: 'AUTOMATIC', label: 'Automatic' }
  ];

  const Gears = [
    { value: 'FOUR', label: 'Four' },
    { value: 'FIVE', label: 'Five' },
    { value: 'SIX', label: 'Six' }
  ];

  const CarRatings = [
    { value: 'ONE', label: 'One' },
    { value: 'TWO', label: 'Two' },
    { value: 'THREE', label: 'Three' },
    { value: 'FOUR', label: 'Four' },
    { value: 'FIVE', label: 'Five' }
  ];

  const Fuels = [
    { value: 'PETROL', label: 'Petrol' },
    { value: 'DIESEL', label: 'Diesel' }
  ];

  const Airs = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];

  const Seats = [
    { value: 'FOUR', label: 'Four' },
    { value: 'FIVE', label: 'Five' },
    { value: 'SIX', label: 'Six' },
    { value: 'SEVEN', label: 'Seven' }
  ];
  const Wheels = [
    { value: 'ALLOY', label: 'Alloy' },
    { value: 'DIAMOND_CUT', label: 'Diamond_cut' }
  ];
  const Roofs = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];
  const VentilatedSeats = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];
  const LEDScreens = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];
  const BackCameras = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];
  const AirBags = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];
  const BackSensors = [
    { value: 'YES', label: 'Yes' },
    { value: 'NO', label: 'No' }
  ];
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  return (
    <div className=" d-flex align-items-center justify-content-center" style={{ width: '100%', height: '110vh' }}>
      <div className=" border rounded-4 p-3 shadow">
        <h4>
          <u>Please Enter The Car Details To Register The Car</u>
        </h4>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '60ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Car number" name="car_number" type="text" onChange={handleChange} inputProps={{ maxLength: 10 }} autoComplete="current-text" variant="standard" />
        </Box>
        {/* <input  type="text" onChange={(e)=>{handleCarNumber(e)}}  /> */}
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Car company name" name="company_name" type="text" onChange={handleChange} autoComplete="current-text" variant="standard" />
          <TextField label="Owner's mobile number" name="owner_phone_number" type="number" onChange={handleChange} autoComplete="current-number" variant="standard" />
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Car model" type="text" name="model" onChange={handleChange} autoComplete="current-text" variant="standard" />
          <TextField
            select
            label="Car type"
            name="car_type"
            value={FormData.car_type}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {CarTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            select
            label="Transmission Type"
            name="transmission_type"
            value={FormData.transmission_type}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Transmissions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="No.of.Gears"
            value={FormData.no_of_gears}
            name="no_of_gears"
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Gears.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            select
            label="Rating"
            value={FormData.car_rating}
            name="car_rating"
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {CarRatings.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="Fuel type"
            name="fuel_type"
            value={FormData.fuel_type}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Fuels.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            select
            label="Air Conditioning"
            name="air_conditioner"
            value={FormData.air_conditioner}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Airs.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="No.of.Seats"
            name="seating_capacity"
            value={FormData.seating_capacity}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Seats.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Year of Manufacturing" type="number" name="year_of_manufacturing" onChange={handleChange} autoComplete="current-number" variant="standard" />
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            select
            label="Wheels Type"
            name="wheels_type"
            value={FormData.wheels_type}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Wheels.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="Panaromic Sunroof"
            name="panaromic_sunroof"
            value={FormData.panaromic_sunroof}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {Roofs.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Fuel Tank Capacity" type="number" name="fuel_tank_capacity" onChange={handleChange} autoComplete="current-number" variant="standard" />
          <TextField
            select
            label="Ventilated Seats"
            name="ventilated_seats"
            value={FormData.ventilated_seats}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {VentilatedSeats.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            select
            label="LED Screen"
            name="led_screen"
            value={FormData.led_screen}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {LEDScreens.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="Back Camera"
            name="back_camera"
            value={FormData.back_camera}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {BackCameras.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            select
            label="Air Bags"
            name="air_bags"
            value={FormData.air_bags}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {AirBags.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField label="Color" type="text" name="color" onChange={handleChange} autoComplete="current-text" variant="standard" />
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Kms Driven" type="text" name="km_driven" onChange={handleChange} autoComplete="current-number" variant="standard" />
          <TextField
            select
            label="Back Sensors"
            name="back_sensors"
            value={FormData.back_sensors}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option></option>
            {BackSensors.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
        </Box>
        <div className=" d-flex justify-content-center align-item-center p-3">
          <button onClick={() => getData(FormData)} className="border border-none rounded-pill px-5 py-1">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarRegistration;
