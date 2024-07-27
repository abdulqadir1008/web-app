import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CalculateTripDuration } from '../Common/TimeDuration';
import { eightHr, oneHr } from '../Common/Constants';

function DateTimePicker(props: any) {
  // const [Start, setStart] = useState<any>();
  // const [End, setEnd] = useState<any>();
  // let testTime = 'Tue May 30 2022 02:01:00 GMT+0530 (Indian Standard Time)';
  const CurrentTime = new Date();
  CurrentTime.setHours(CurrentTime.getHours() + 1);
  const minutes = Math.ceil(CurrentTime.getMinutes() / 30) * 30;
  const hours = CurrentTime.getHours();
  CurrentTime.setMinutes(minutes);
  /**REDUX**/
  // const dateProps: any = useSelector((state) => state);
  // let StoredDateTime = dateProps.landingPageReducer.DateTimeValues;
  let Start = null;
  let End = null;
  if (props.StoredDateTime) {
    const StoredStartDateTime: Date = new Date(props.StoredDateTime.startDate);
    const StoredEndDateTime: Date = new Date(props.StoredDateTime.endDate);
    const diff = StoredStartDateTime.getTime() - new Date().getTime();
    const diffInHr = diff / 3600000;
    // if (StoredStartDateTime) {
    // if (StoredStartDateTime.getHours() >= CurrentTime.getHours()) {
    if (diffInHr >= 1) {
      // setStart(StoredStartDateTime);
      Start = StoredStartDateTime;
      const minutes = Math.ceil(Start.getMinutes() / 30) * 30;
      Start.setMinutes(minutes);
      // setEnd(StoredEndDateTime);
      End = StoredEndDateTime;
      const endMinutes = Math.ceil(End.getMinutes() / 30) * 30;
      End.setMinutes(endMinutes);
    }
    // }
  }
  /**REDUX**/
  const [startDate, setStartDate] = useState<Date>(Start ? new Date(Start) : new Date(CurrentTime));
  const [endDate, setEndDate] = useState<Date>(End ? new Date(End) : new Date(new Date(startDate).getTime() + eightHr));
  const [tripDuration, setTripDuration] = useState('');
  const [StartTimes, setStartTimes] = useState<Date[]>([]);
  const [EndTimes, setEndTimes] = useState<Date[]>([]);
  const StartTimesArray: any = [];
  const EndTimesArray: any = [];
  const ExcludeStartTime = () => {
    if (startDate.getDate() === new Date().getDate() && startDate.getMonth() === new Date().getMonth() && startDate.getFullYear() === new Date().getFullYear()) {
      if (startDate!.getTime() < CurrentTime.getTime()) {
        startDate!.setTime(CurrentTime.getTime());
      }
      for (let hour = 0; hour <= hours; hour++) {
        for (let minute = 0; minute <= 30; minute += 30) {
          if (hour === hours && minute >= minutes) {
            break;
          }
          const time = new Date();
          time.setHours(hour);
          time.setMinutes(minute);
          StartTimesArray.push(time);
        }
      }
      setStartTimes(StartTimesArray);
    } else {
      setStartTimes([]);
    }
  };
  const ExcludeEndTime = () => {
    const CurrentStartTime = new Date(startDate);
    const MinEndTime = CurrentStartTime.getTime() + eightHr;
    const MinHour = new Date(MinEndTime).getHours();
    const MinMinutes = new Date(MinEndTime).getMinutes();
    if (
      (new Date(MinEndTime).getDate() === new Date(startDate).getDate() + 1 && new Date(endDate).getDate() === new Date(startDate).getDate() + 1) ||
      (new Date(MinEndTime).getDate() === new Date(startDate).getDate() && new Date(endDate).getDate() === new Date(startDate).getDate()) ||
      (new Date(MinEndTime).getMonth() === new Date(startDate).getMonth() + 1 && new Date(endDate).getMonth() === new Date(startDate).getMonth() + 1) ||
      (new Date(MinEndTime).getFullYear() === new Date(startDate).getFullYear() + 1 && new Date(endDate).getFullYear() === new Date(startDate).getFullYear() + 1)
    ) {
      if (endDate!.getTime() < new Date(MinEndTime).getTime()) {
        endDate!.setTime(new Date(MinEndTime).getTime());
      }
      for (let hour = 0; hour <= MinHour; hour++) {
        for (let minute = 0; minute <= 30; minute += 30) {
          if (hour === MinHour && minute >= MinMinutes) {
            break;
          }
          const time = new Date(startDate);
          time.setHours(hour);
          time.setMinutes(minute);
          EndTimesArray.push(time);
        }
      }
      setEndTimes(EndTimesArray);
    } else {
      setEndTimes([]);
    }
  };

  useEffect(() => {
    ExcludeStartTime();
    const TimeDiff = endDate.getTime() - startDate.getTime();
    if (TimeDiff < 28800000) setEndDate(new Date(new Date(startDate).getTime() + eightHr));
  }, [startDate]);

  useEffect(() => {
    ExcludeEndTime();
    const TripTime = CalculateTripDuration(endDate, startDate);
    setTripDuration(TripTime!);
    props.startDate(startDate);
    props.endDate(endDate);
  }, [startDate, endDate]);

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className="button-datePicker  heading-text" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className={`${props.class}`}>
      <div className={`${props.class2}`}>
        <div className={`d-md-flex ${props.class1}`}>
          <div style={{ width: '6rem' }} className="d-md-flex align-items-center m-0 heading-text heading-fw">
            Start Date:
          </div>
          <DatePicker
            className={`datePicker-input  `}
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
            showTimeSelect
            excludeTimes={StartTimes}
            minDate={new Date(new Date().getTime() + oneHr)}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<ExampleCustomInput />}
          />
        </div>
        <div className="d-md-flex">
          <div style={{ width: '6rem' }} className="d-md-flex align-items-center m-0 heading-text heading-fw">
            End Date:
          </div>
          <DatePicker
            className="datePicker-input"
            selected={endDate}
            onChange={(date) => setEndDate(date!)}
            showTimeSelect
            excludeTimes={EndTimes}
            minDate={new Date(new Date(startDate).getTime() + eightHr)}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<ExampleCustomInput />}
          />
        </div>
      </div>
      <div>
        <div className={`${props.durationClass}`}>Trip Duration: {tripDuration}</div>
      </div>
    </div>
  );
}

export default DateTimePicker;
