import { TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'

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
  const SMinValue = `${startMinYear}-${startMinMonth}-${startMinDate}T${startMinHour}:${startMinMin}:00.000Z`;

  const startMaxYear = year + 1;
  const startMaxMonth = month;
  const startMaxDate = date;
  const startMaxHour = hours;
  const startMaxMin = min;
  const SMaxValue = `${startMaxYear}-${startMaxMonth}-${startMaxDate}T${startMaxHour}:${startMaxMin}:00.000Z`;
  return { SMinValue, SMaxValue };
};

const CarDateList = () => {
    const { SMinValue, SMaxValue } = getStartingInputData();

    const [StartValue, setStartValue] = useState<Dayjs>(dayjs(SMinValue));
    const [EndValue, setEndValue] = useState<Dayjs>(dayjs(SMinValue));
    const [EndMin, setEndMin] = useState<Dayjs>(dayjs(SMinValue));
    const [EndMax, setEndMax] = useState<Dayjs>(dayjs(SMaxValue));

    const [StartMinValue, setStartMinValue] = useState<dayjs.Dayjs | string>(SMinValue);
    const [StartMaxValue, setStartMaxValue] = useState(SMaxValue);

    React.useEffect(() => {
        const endMinValue = dayjs(StartValue).add(1, 'day');
        const endMaxValue = dayjs(endMinValue).add(1, 'year');

        setStartMinValue(StartValue);

        setEndValue(() => {
            return endMinValue;
        });
        setEndMin(() => {
            return endMinValue;
        });
        setEndMax(() => {
            return endMaxValue;
        });
    }, [StartValue]);

    const submit = () => {
    }

    const [days, setdays] = useState<string[]>(['0','1','2','3','4','5','6']);
    const clicked = (e: React.SyntheticEvent<Element, Event>) => {
        const {checked,value}:any = e.target;
        if (checked) {
            setdays([...days,value]);
        } else if(!checked) {
            const newdays = days.filter((item)=>item !== value)
            setdays(newdays);
        }
    }
    function filterWeekends(date:Dayjs) {
        for(let eachDay in days){
            return date.day() === parseInt(eachDay);
        }
    }

  return (
    <div className="border border-dark container-fluid " style={{width:'100%' , height:'90vh'}}>
        <div className="border border-dark d-flex justify-content-center align-items-center" style={{width:'100%' , height:'45vh'}}>
            <div className='border border-dark'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="container d-flex  my-4">
                        <DateTimePicker
                            label="From"
                            openTo="day"
                            value={StartValue}
                            onChange={(newValue:any) => {
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
                    <div className="container d-flex my-4">
                        <DateTimePicker
                            label="To"
                            openTo="day"
                            value={EndValue}
                            onChange={(newValue:any) => {
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
                <div>
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={0} onChange={(e)=>{clicked(e)}}  label="Sun" labelPlacement="bottom" />
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={1} onChange={(e)=>{clicked(e)}}  label="Mon" labelPlacement="bottom" />
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={2} onChange={(e)=>{clicked(e)}}  label="Tue" labelPlacement="bottom" />
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={3} onChange={(e)=>{clicked(e)}}  label="Wed" labelPlacement="bottom" />
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={4} onChange={(e)=>{clicked(e)}}  label="Thu" labelPlacement="bottom" />
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={5} onChange={(e)=>{clicked(e)}}  label="Fri" labelPlacement="bottom" />
                <FormControlLabel className='m-0 p-0' control={<Checkbox defaultChecked />} value={6} onChange={(e)=>{clicked(e)}}  label="Sat" labelPlacement="bottom" />
                </div>
                <div className="d-flex justify-content-center">
                    <button className='btn rounded-pill m-1 p-0 px-4 bg-info' onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
        <div className="border border-dark d-flex justify-content-center align-items-center" style={{width:'100%' , height:'45vh'}}>
            <p>You have selected</p>
            {/* <p>From = {StartValue}</p>
            <p>To = {EndValue}</p> */}
        </div>
    </div>
  )
}

export default CarDateList;