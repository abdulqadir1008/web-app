import { useEffect, useRef, useState } from 'react';

const Timer = (props: any) => {
  const [timer, setTimer] = useState<number>(props.timeSec);
  const timerRef = useRef(timer);

  const startTimer = () => {
    let intervalId = setInterval(() => {
      if (timerRef.current === 0) {
        clearInterval(intervalId);
      } else {
        setTimer((timer) => timer - 1);
      }
    }, 1000);
  };
  const handleResendOtp = () => {
    setTimer(props.timeSec);
    startTimer();
    props.functionCall(true);
  };

  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);
  useEffect(() => {
    startTimer();
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {timer === 0 ? (
        <button className={`${props.class}`} style={{ cursor: 'pointer', border: '0.011rem solid grey' }} onClick={handleResendOtp}>
          Resend OTP
        </button>
      ) : (
        <>
          <p className="m-0 p-0 my-2">
            Resend OTP in:&nbsp;
            {props.timeSec > 60 ? <>{formatTime()}</> : <>{timer}</>} sec
          </p>
        </>
      )}
    </div>
  );
};

export default Timer;
