import { useEffect, useRef, useState } from 'react';
import MapsLatLngs from '../../components/MapsLatLnd';
import './LandingPage.css';
import { getCookie, setCookie } from '../../components/Cookies';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDateTime, setLocation } from '../../redux/actionTypes/landingPage';
import Banner1 from '../../assets/LandingPageBanner/Banner1.png';
import Banner2 from '../../assets/LandingPageBanner/Banner2.png';
import Banner3 from '../../assets/LandingPageBanner/Banner3.png';
import MBanner1 from '../../assets/LandingPageBanner/MBanner1.png';
import MBanner2 from '../../assets/LandingPageBanner/MBanner2.png';
import MBanner3 from '../../assets/LandingPageBanner/MBanner3.png';
import DateTimePicker from '../../components/DateTimePicker';
import { DateTimeFormatter, DateTimeView } from '../../Common/DateTimeFormatter';
import { oneHr } from '../../Common/Constants';

const LandingPage = () => {
  const props: any = useSelector((state) => state);
  let state = { address: '', lat: '', lng: '' };
  if (props.landingPageReducer.LocationValues.address) {
    state = { address: props.landingPageReducer.LocationValues.address, lat: props.landingPageReducer.LocationValues.lat, lng: props.landingPageReducer.LocationValues.lng };
  }
  const startRef = useRef<Date>();
  const endRef = useRef<Date>();
  const dateProps: any = useSelector((state) => state);
  // let StoredDateTime = dateProps.landingPageReducer.DateTimeValues;
  let StoredDateTime = JSON.parse(sessionStorage.getItem('TripDuration')!);
  const dispatch = useDispatch();
  const [LatLng, setLatLng] = useState(state);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const navigate = useNavigate();
  let LocationData = null;
  let lat: any;
  let lng: any;
  let address: any;
  let LocationFromCookie = null;
  if (getCookie('LocationValues')) {
    LocationFromCookie = JSON.parse(getCookie('LocationValues')!);
    address = LocationFromCookie.address;
    lat = LocationFromCookie.lat;
    lng = LocationFromCookie.lng;
  }
  // console.log(LocationFromCookie, 'LocationFromCookie');
  LocationData = (address?: any, lat?: any, lng?: any) => {
    setLatLng({ address, lat, lng });
  };
  const handleClicked = () => {
    sessionStorage.setItem('TripDuration', JSON.stringify({ startDate: startDate, endDate: endDate }));
    setCookie('LocationValues', JSON.stringify({ address: LatLng.address ? LatLng.address : address, lat: LatLng.lat ? LatLng.lat : lat, lng: LatLng.lng ? LatLng.lng : lng }));
    const addr = LatLng.address ? LatLng.address : address;
    const lats = LatLng.lat ? LatLng.lat : lat;
    const lngs = LatLng.lng ? LatLng.lng : lng;
    dispatch(setLocation(addr, lats, lngs));
    dispatch(setDateTime(startDate, endDate));
    if (address || LatLng.lat || props.landingPageReducer.LocationValues.address) {
      if (startDate?.getTime()! < new Date().getTime() + oneHr) {
        console.log();
        alert('Trip start time should be one hour ahead of current time so time has been updated.');
      }
      navigate({
        pathname: '/allCars2',
        search: `?lat=${LatLng.lat ? LatLng.lat : lat}&lng=${LatLng.lng ? LatLng.lng : lng}&address=${
          LatLng.address ? LatLng.address.replaceAll(/ /g, '') : address.replaceAll(/ /g, '')
        }&starts=${startDate?.getTime()}&ends=${endDate?.getTime()}`
      });
    } else {
      alert('Please enter all the values before searching');
    }
  };
  const handleStartDateTime = (startDateTime?: Date) => {
    startRef.current = startDateTime;
  };
  const handleEndDateTime = (endDateTime: Date) => {
    endRef.current = endDateTime;
  };
  const handleConfirm = () => {
    setStartDate(startRef.current);
    setEndDate(endRef.current);
  };
  useEffect(() => {
    setStartDate(startRef.current);
    setEndDate(endRef.current);
  }, []);

  return (
    <div>
      <section>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Banner2} className="d-block w-100 desktop-view" alt="..." />
              <img src={MBanner2} className="d-block w-100 mobile-view " alt="..." style={{ maxHeight: '300px' }} />
            </div>
            <div className="carousel-item">
              <img src={Banner1} className="d-block w-100 desktop-view" alt="..." />
              <img src={MBanner1} className="d-block w-100 mobile-view" alt="..." style={{ maxHeight: '300px' }} />
            </div>
            <div className="carousel-item">
              <img src={Banner3} className="d-block w-100 desktop-view" alt="..." />
              <img src={MBanner3} className="d-block w-100 mobile-view" alt="..." style={{ maxHeight: '300px' }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="main-box-card mx-auto">
        {/* <div className="welcome-text mb-2">
          <div className="d-flex justify-content-center">
            <img src="" alt="" />
            <h1 className="animated-characters ">Seize the Wheel</h1>
            <h1 className="animated-characters ">Hit the Road, On Your Terms</h1>
          </div>
          <div className="d-flex justify-content-center">
            <h1 className="tagline"> Discover Seamless Self-Drive Car Rentals</h1>
          </div>
        </div> */}
        <div className="main">
          <div className="location-box">
            <MapsLatLngs LocationData={LocationData} lat={lat} lng={lng} address={address} />
          </div>
          <div>
            <button type="button" className="date-modal-button  heading-text " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              {DateTimeView(DateTimeFormatter(startDate))} &nbsp;-&nbsp;
              {DateTimeView(DateTimeFormatter(endDate))}
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title" id="staticBackdropLabel">
                      The Journey Begins: Choose Your Journey Dates
                    </h3>
                    <button type="button" className="btn-close normal-text bg-transparent" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-lg-flex justify-content-center">
                      <DateTimePicker
                        startDate={handleStartDateTime}
                        endDate={handleEndDateTime}
                        class1={'mb-3'}
                        class={'ms-2 datePicker-box'}
                        durationClass={'mt-3 orange-text heading-text heading-fw'}
                        class2={'datePicker-mobile'}
                        StoredDateTime={StoredDateTime}
                      />
                    </div>
                  </div>
                  <div className="modal-footer p-1">
                    <button type="button" className="btn  normal-text bg-danger p-1 px-2 text-light" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn  normal-text bg-primary p-1 px-2 text-light" data-bs-dismiss="modal" onClick={handleConfirm}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="d-lg-flex justify-content-center">
            <DateTimePicker
              startDate={handleStartDateTime}
              endDate={handleEndDateTime}
              class1={'mb-3'}
              class={'ms-2 datePicker-box'}
              durationClass={'mt-3 orange-text heading-text heading-fw'}
              class2={'datePicker-mobile'}
              StoredDateTime={StoredDateTime}
            />
          </div> */}
        </div>
        <div className="d-flex justify-content-center my-3">
          <button type="button" className="button-box book-button-color border-0" onClick={() => handleClicked()}>
            {' '}
            <p className="p-0 m-0 heavy-text px-4 py-1 heading-text">Search Cars</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
