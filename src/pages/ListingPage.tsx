import { DataObject } from '@mui/icons-material';
import { TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import MapsLatLngs from '../components/MapsLatLnd';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

import { getCookie } from '../components/Cookies';
import { CreateListing, OwnerGetCarsQuery } from '../graphqlQueries/OwnerQuery';
import { resolvePostApi, resolvePostApiWithHeaders } from '../Common/ResolveApi';

const initialDateTime = () => {
  let datetime = new Date();
  let year = datetime.getFullYear();
  let month;
  if (datetime.getMonth() + 1 <= 9) {
    month = '0' + (datetime.getMonth() + 1);
  } else {
    month = datetime.getMonth() + 1;
  }
  let date;
  if (datetime.getDate() <= 9) {
    date = '0' + datetime.getDate();
  } else {
    date = datetime.getDate();
  }
  let hours;
  if (datetime.getUTCHours() + 1 <= 9) {
    hours = '0' + (datetime.getUTCHours() + 1);
  } else {
    hours = datetime.getUTCHours() + 1;
  }
  let min;
  if (datetime.getUTCMinutes() <= 9) {
    min = '0' + datetime.getUTCMinutes();
  } else {
    min = datetime.getUTCMinutes();
  }
  return { year, month, date, hours, min };
};

const getStartingInputData = () => {
  const { year, month, date, hours, min } = initialDateTime();
  const startMinYear = year;
  const startMinMonth = month;
  const startMinDate = date;
  const startMinHour = hours;
  const startMinMin = min;
  const SMinValue = `${startMinYear}-${startMinMonth}-${startMinDate}T${startMinHour}:30:00.000Z`;

  const startMaxYear = year + 1;
  const startMaxMonth = month;
  const startMaxDate = date;
  const startMaxHour = hours;
  const startMaxMin = min;
  const SMaxValue = `${startMaxYear}-${startMaxMonth}-${startMaxDate}T${startMaxHour}:30:00.000Z`;
  return { SMinValue, SMaxValue };
};

const CarDateList = () => {
  const getData = async () => {
    try {
      await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, CreateListing(CarNumber, StartValue, EndValue, LatLng));
    } catch (error) {
      console.log(error);
    }
  };
  const [OwnerCars, setOwnerCars] = useState<any[]>([]);
  const Token = getCookie('Owner_access_token');
  const getCarNumber = async () => {
    try {
      const { getOwnerCars } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, OwnerGetCarsQuery(), Token);
      setOwnerCars(getOwnerCars);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCarNumber();
  }, []);

  const [CarNumber, setCarNumber] = useState('');
  const handleCarNumber = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setCarNumber(value);
  };

  const { SMinValue, SMaxValue } = getStartingInputData();

  const [StartValue, setStartValue] = useState<Dayjs>(dayjs(SMinValue));
  const [EndValue, setEndValue] = useState<Dayjs>(dayjs(SMinValue));
  const [EndMin, setEndMin] = useState<Dayjs>(dayjs(SMinValue));
  const [EndMax, setEndMax] = useState<Dayjs>(dayjs(SMaxValue));

  const [StartMinValue, setStartMinValue] = useState<dayjs.Dayjs | string>(SMinValue);
  const [StartMaxValue, setStartMaxValue] = useState(SMaxValue);

  // const [Count, setCount] = useState(true);
  // const [SV, setSV] = useState<Dayjs>()
  // const [EV, setEV] = useState<Dayjs>()
  // const [DateObj, setDateObj] = useState([{SV,EV}])
  const submit = () => {
    // setCount(true?false:true);
    // setStartMinValue(EndValue.add(1,'hour'));
    // if (DateObj[DateObj.length-1].SV?.date() !== newDateObj[newDateObj.length-1].SV?.date() && DateObj[DateObj.length-1].EV?.date() !== newDateObj[newDateObj.length-1].EV?.date()) {
    //     setDateObj(newDateObj);
    // }
    // let newDateObj = [...DateObj];
    // newDateObj.push({SV,EV});
    // newDateObj.filter(item1 => {
    //     !DateObj.some(item2 => {
    //         if (JSON.stringify(item1.SV) === JSON.stringify(item2.SV) || JSON.stringify(item1.EV) === JSON.stringify(item2.EV)) {
    //             // alert('please enter correct dates')
    //         }else{setDateObj(newDateObj);}
    // })
    // })
  };
  // const clear = () => {
  //     setDateObj([{SV:undefined, EV:undefined}]);
  // }
  // const close = (SV: dayjs.Dayjs) => {
  //     let newData = DateObj.filter((item)=>{JSON.stringify(item.SV) !== JSON.stringify(SV)})
  //     setDateObj(newData);
  // }
  React.useEffect(() => {
    const endMinValue = dayjs(StartValue).add(1, 'day');
    const endMaxValue = dayjs(StartMinValue).add(1, 'year');
    // setStartMinValue(StartValue);
    setEndValue(() => {
      return endMinValue;
    });
    setEndMin(() => {
      return endMinValue;
    });
    setEndMax(() => {
      return endMaxValue;
    });
    // setSV(StartValue.subtract(6, 'hour'))
    // setEV(EndValue.subtract(6,'hour'))
  }, [StartValue]);

  // const [days, setdays] = useState<string[]>(['0','1','2','3','4','5','6']);
  // const clicked = (e: React.SyntheticEvent<Element, Event>) => {
  //     const {checked,value}:any = e.target;
  //     if (checked) {
  //         setdays([...days,value]);
  //     } else if(!checked) {
  //         const newdays = days.filter((item)=>item !== value)
  //         setdays(newdays);
  //     }
  // }
  // function filterWeekends(date:Dayjs) {
  //     for(let eachDay in days){
  //         return date.day() === parseInt(eachDay);
  //     }
  // }
  const [LatLng, setLatLng] = useState({ address: '', lat: '', lng: '' });
  const Place = 'location ...';
  const LatData = (address?: any, lat?: any, lng?: any) => {
    setLatLng({ address, lat, lng });
  };

  return (
    <div className="container-fluid " style={{ width: '100%', height: '86vh' }}>
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
        <div className="border rounded-4 shadow col-lg-5 col-md-5 col-11">
          <TextField
            className="col-9 mx-5 my-4"
            select
            label="Car type"
            value={CarNumber}
            onChange={handleCarNumber}
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option value=""></option>
            {OwnerCars.map((item) => (
              <option key={item.car_number} value={item.car_number}>
                {item.car_number}
              </option>
            ))}
          </TextField>
          <div className="col-9 mx-5 my-4">
            <MapsLatLngs LatData={LatData} name={Place} lat={''} lng={''} address={''} />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="container d-flex mx-5 my-4 col-9">
              <DateTimePicker
                className="col-12"
                label="From"
                openTo="day"
                minutesStep={60}
                value={StartValue}
                onChange={(newValue: any) => {
                  setStartValue(() => {
                    return newValue;
                  });
                }}
                minDate={dayjs(StartMinValue)}
                maxDate={dayjs(StartMaxValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="container d-flex mx-5 my-4 col-9">
              <DateTimePicker
                className="col-12"
                label="To"
                openTo="day"
                value={EndValue}
                minutesStep={60}
                onChange={(newValue: any) => {
                  setEndValue(() => {
                    return newValue;
                  });
                }}
                minDate={dayjs(EndMin)}
                maxDate={dayjs(EndMax)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
          {/* <div>
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={0} onChange={(e)=>{clicked(e)}}  label="Sun" labelPlacement="bottom" />
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={1} onChange={(e)=>{clicked(e)}}  label="Mon" labelPlacement="bottom" />
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={2} onChange={(e)=>{clicked(e)}}  label="Tue" labelPlacement="bottom" />
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={3} onChange={(e)=>{clicked(e)}}  label="Wed" labelPlacement="bottom" />
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={4} onChange={(e)=>{clicked(e)}}  label="Thu" labelPlacement="bottom" />
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={5} onChange={(e)=>{clicked(e)}}  label="Fri" labelPlacement="bottom" />
              <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={6} onChange={(e)=>{clicked(e)}}  label="Sat" labelPlacement="bottom" />
              </div> */}
          <div className="d-flex justify-content-center">
            <button className="btn rounded-pill p-0 px-4 bg-info m-5 " onClick={getData}>
              Submit
            </button>
            {/* <button className='btn rounded-pill m-1 p-0 px-4 bg-info' onClick={clear}>Clear</button> */}
          </div>
        </div>
      </div>
      {/* <div className="border border-dark d-flex justify-content-center align-items-center" style={{width:'100%' , height:'45vh'}}>
            <div className="">
                <p>You have selected</p>
                {DateObj.map(items => {const {SV, EV} = items;
                    if(SV && EV){
                        return(
                        <div key={JSON.stringify(SV)} className='m-0 p-0 d-flex'>
                            <div className="">
                                <p>From = {JSON.stringify(SV)}</p>
                                <p>To = {JSON.stringify(EV)}</p>
                            </div>
                            <div className="">
                                <button className='btn' onClick={()=>close(SV)} ><MdClose /></button>
                            </div>
                        </div>
                    )}
                    })}
            </div>
        </div> */}
    </div>
  );
};

export default CarDateList;
