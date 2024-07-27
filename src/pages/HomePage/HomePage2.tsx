import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCookie, setCookie } from '../../components/Cookies';
import { DateTimeFormatter, DateTimeView, DateTimeViews } from '../../Common/DateTimeFormatter';
import DateTimePicker from '../../components/DateTimePicker';
import MapsLatLngs from '../../components/MapsLatLnd';
import { resolvePostApi } from '../../Common/ResolveApi';
import { getAvailableCarsQuery } from '../../graphqlQueries/CarDetailsQuery';
import { filters, sortCategory1, sortCategory2 } from './HomePageConstants';
import Star from '../../assets/Star.png';
import Gear from '../../assets/Gear.png';
import Hatchback from '../../assets/Hatchback.png';
import Sedan from '../../assets/Sedan.png';
import SUV from '../../assets/SUV.png';
import CarSeat from '../../assets/Car-seat.png';
import GasStation from '../../assets/GasStation.png';
import { Backdrop, Box, Checkbox, CircularProgress, Rating } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { Carousel } from 'react-responsive-carousel';
import '../../components/carousel.css';
import Rect from '../../assets/Rectangle2.png';

interface I_filter {
  car_type: string[];
  fuel_type?: string;
  seating_capacity: string[];
  car_rating?: string;
  transmission_type?: string;
}
interface I_locationData {
  address: string;
  lat: string;
  lng: string;
}
interface I_tripDetailAttributes {
  starts: Date;
  ends: Date;
  address: string;
  lat: string;
  lng: string;
}
function HomePage2() {
  const startDateRef = useRef<Date>();
  const endDateRef = useRef<Date>();
  const [SearchParams] = useSearchParams({ starts: '', ends: '', address: '', lat: '', lng: '' });
  const navigate = useNavigate();
  /******STATE*/
  const [tripDetailAttributes, setTripDetailAttributes] = useState<I_tripDetailAttributes>({
    starts: new Date(parseInt(SearchParams.get('starts')!, 10))!,
    ends: new Date(parseInt(SearchParams.get('ends')!, 10))!,
    address: SearchParams.get('address')!,
    lat: SearchParams.get('lat')!,
    lng: SearchParams.get('lng')!
  });
  const [availableCarsDataList, setAvailableCarsDataList] = useState([]);
  const [timeDropdownToggle, setTimeDropdownToggle] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<I_filter>({ car_type: [], seating_capacity: [] });
  const [sortBy, setSortBy] = useState('PRICE_LOW_TO_HIGH');
  const [locationData, setLocationData] = useState<I_locationData>();
  const [loader, setLoader] = useState(true);
  const [storedDateTime, setStoredDateTime] = useState({ startDate: tripDetailAttributes.starts, endDate: tripDetailAttributes.ends });
  const [compareCarIdList, setcompareCarIdList] = useState<any[]>([]);
  const [modalClass, setmodalClass] = useState('modal-sticky-class');
  /******STATE*/

  if (!sessionStorage.getItem('TripDuration')) {
    sessionStorage.setItem('TripDuration', JSON.stringify({ startDate: tripDetailAttributes.starts, endDate: tripDetailAttributes.ends }));
  }
  if (!getCookie('LocationValues')) {
    setCookie('LocationValues', JSON.stringify({ address: tripDetailAttributes.address, lat: tripDetailAttributes.lat, lng: tripDetailAttributes.lng }));
  }
  const getCarListData = async () => {
    try {
      setLoader(true);
      const { getAvailableCars } = await resolvePostApi(
        import.meta.env.VITE_BACKEND_BASE_URL,
        getAvailableCarsQuery(tripDetailAttributes.starts, tripDetailAttributes.ends, tripDetailAttributes.lat, tripDetailAttributes.lng, sortBy!, filterValue!)
      );
      setAvailableCarsDataList(getAvailableCars);
      setLoader(false);
    } catch (error) {}
  };
  const LocationData = (address?: any, lat?: any, lng?: any) => {
    setLocationData({ ...locationData, address: address, lat: lat, lng: lng });
  };
  /**** */
  const handleSort = async (e: any) => {
    const { value } = e.target;
    setSortBy(value);
    async () => {
      await getCarListData();
    };
  };
  const handleFilterButton = async (e: any) => {
    const { className, name, value } = e.target;
    const filter: any = { ...filterValue };
    switch (name) {
      case 'fuel_type':
        if (filter.fuel_type === value) {
          delete filter.fuel_type;
        } else {
          filter.fuel_type = value;
        }

        break;
      case 'car_type':
        if (filter[name]) {
          if (filter[name].includes(value)) {
            filter[name].splice(filter[name].indexOf(value), 1);
          } else {
            filter[name].push(value);
          }
        } else {
          filter.car_type = [value];
        }
        break;
      case 'seating_capacity':
        if (filter[name]) {
          if (filter[name].includes(value)) {
            filter[name].splice(filter[name].indexOf(value), 1);
          } else {
            filter[name].push(value);
          }
        } else {
          filter.seating_capacity = [value];
        }
        break;
      case 'car_rating':
        if (filter.car_rating === value) {
          delete filter.car_rating;
        } else {
          filter.car_rating = value;
        }
        break;
      case 'transmission_type':
        if (filter.transmission_type === value) {
          delete filter.transmission_type;
        } else {
          filter.transmission_type = value;
        }
        break;
    }
    setFilterValue(filter);
  };
  const handleReset = async () => {
    const filter: any = { car_type: [], seating_capacity: [] };
    setFilterValue(filter);

    async () => {
      await getCarListData();
    };
  };
  const handleTimeDropdownButton = () => {
    if (!timeDropdownToggle) {
      setTimeDropdownToggle(true);
    } else {
      setTimeDropdownToggle(false);
    }
  };
  const clicked = (car_id: string) => {

    navigate({
      pathname: '/billing',
      search: `?car_id=${car_id}&lat=${tripDetailAttributes.lat}&lng=${tripDetailAttributes.lng}&address=${tripDetailAttributes.address.replaceAll(
        / /g,
        ''
      )}&starts=${tripDetailAttributes.starts.getTime()}&ends=${tripDetailAttributes.ends.getTime()}`
    });
  };
  const handleStartDateTime = (startD: Date) => {
    startDateRef.current = startD;
  };
  const handleEndDateTime = (endD: Date) => {
    endDateRef.current = endD;
  };
  const handleUpdateResult = async () => {
    setTripDetailAttributes({ ...tripDetailAttributes, starts: startDateRef.current!, ends: endDateRef.current! });
    setStoredDateTime({ startDate: startDateRef.current!, endDate: endDateRef.current! });
    sessionStorage.setItem('TripDuration', JSON.stringify({ startDate: startDateRef.current!, endDate: endDateRef.current! }));
    setmodalClass('modal-sticky-class');
  };
  const handleSearch = () => {
    if (locationData) {
      setTripDetailAttributes({ ...tripDetailAttributes, lat: locationData?.lat!, lng: locationData?.lng!, address: locationData?.address! });
      setCookie('LocationValues', JSON.stringify({ address: locationData?.address!, lat: locationData?.lat!, lng: locationData?.lng! }));
    }
  };
  const handleCompare = async (e: React.SyntheticEvent<Element, Event>, car_id: string, company_name: string, model: string) => {
    const { checked }: any = e.target;
    if (checked) {
      {
        if (compareCarIdList!.length < 3) {
          const newItem = { car_id: car_id, company_name: company_name, model: model };
          const UpdatedArray = [...compareCarIdList!, newItem];
          setcompareCarIdList(UpdatedArray);
        } else {
          alert('Cannot compare more than 3 cars at once');
        }
      }
    } else if (!checked) {
      if (compareCarIdList!.length) {
        const updatedArray = compareCarIdList!.filter((item: any) => item.car_id !== car_id);
        setcompareCarIdList(updatedArray);
      }
    }
  };
  const handleCompareButton = () => {
    navigate({
      pathname: '/compare',
      search: `?compare=${JSON.stringify(compareCarIdList)}&lat=${tripDetailAttributes.lat}&lng=${tripDetailAttributes.lng}&address=${tripDetailAttributes.address.replaceAll(
        / /g,
        ''
      )}&starts=${tripDetailAttributes.starts.getTime()}&ends=${tripDetailAttributes.ends.getTime()}`
    });
  };
  useEffect(() => {
    getCarListData();
  }, []);
  useEffect(() => {
    getCarListData();
    navigate({
      pathname: '/allcars2',
      search: `?lat=${tripDetailAttributes.lat}&lng=${tripDetailAttributes.lng}&address=${tripDetailAttributes.address.replaceAll(
        / /g,
        ''
      )}&starts=${tripDetailAttributes.starts.getTime()}&ends=${tripDetailAttributes.ends.getTime()}`
    });
  }, [tripDetailAttributes]);
  useEffect(() => {
    getCarListData();
  }, [filterValue, sortBy]);
  useEffect(() => {
    setTripDetailAttributes({...tripDetailAttributes,starts:startDateRef.current!,ends:endDateRef.current!})
  }, [startDateRef.current,endDateRef.current])
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const filterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-funnel" viewBox="0 0 16 16">
      <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
    </svg>
  );
  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" id="search">
      <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
    </svg>
  );
  /*******/
  const renderSortBy = (sortBy: any, category: any) => {
    return category.map((item: any) => {
      const name = item.name;
      const id = item.id;
      return (
        <div key={id}>
          <button onClick={handleSort} type="button" className={`normal-text button-box filter-button filter-fixed-width-button ${sortBy === name && 'filter-active'}`} value={item.name}>
            {item.value}
          </button>
        </div>
      );
    });
  };
  const renderFilter = (filter: any, filterValue: any, key: string, noFixWidth = false) => {
    return filter.map((item: any) => {
      const { name, value, id } = item;
      //   const name = item.name;
      //   const value = item.value;
      //   const id = item.id;
      let className;
      className = `normal-text button-box filter-button filter-fixed-width-button filter-btn-mar ${filterValue[key] === value && 'filter-active'}`;
      if (noFixWidth) {
        className = `normal-text button-box filter-button filter-btn-mar ${filterValue[key] === value && 'filter-active'}`;
        if (key === 'seating_capacity') className = `normal-text button-box filter-button  filter-btn-mar ${filterValue[key].includes(value) && 'filter-active'}`;
      }
      return (
        <div key={id}>
          <button onClick={handleFilterButton} type="button" className={className} name={name} value={value}>
            {item.displayValue}
          </button>
        </div>
      );
    });
  };
  const renderFilterComponent = (sortBy: any, filterValue: any) => {
    return (
      <>
        <div className="border-bottom p-3 pt-2 ">
          <div className="heading-text heading-fw mb-2">Sort By</div>
          <div className="d-flex justify-content-between mb-3">{renderSortBy(sortBy, sortCategory1)}</div>
          <div className="d-flex justify-content-between">{renderSortBy(sortBy, sortCategory2)}</div>
        </div>
        <div className="border-bottom p-3 pt-1">
          <div className="d-flex justify-content-between">
            <div className="heading-text heading-fw mb-2">Filter By</div>
            <button className=" orange-text border-0 bg-transparent p-0 m-0 heading-text" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="d-flex  ms-1">
            <div className="col-3 d-flex justify-content-center">
              <img src={GasStation} alt="" className=" filter-icon" />
            </div>
            <div className="d-flex justify-content-between col-9">{renderFilter(filters.fuel_type, filterValue, 'fuel_type')}</div>
          </div>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between ms-1">
          <div className="col-3  d-flex justify-content-center">
            <img src={Star} alt="" className=" filter-icon" />
          </div>
          <div className="d-flex justify-content-between col-9">{renderFilter(filters.car_rating, filterValue, 'car_rating', true)}</div>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between ms-1">
          <div className="col-3 d-flex justify-content-center">
            <img src={Gear} alt="" className=" filter-icon" />
          </div>
          <div className="d-flex justify-content-between col-9">{renderFilter(filters.transmission_type, filterValue, 'transmission_type')}</div>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between ms-1">
          <div className="col-3 d-flex justify-content-center">
            <img src={CarSeat} alt="" className=" filter-icon" />
          </div>
          <div className="d-flex justify-content-between col-9">{renderFilter(filters.seating_capacity, filterValue, 'seating_capacity', true)}</div>
        </div>
        <div className="p-3 d-flex justify-content-between">
          <button
            onClick={handleFilterButton}
            type="button"
            className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('HATCHBACK') && 'filter-active'}`}
            name="car_type"
            value="HATCHBACK"
          >
            <img src={Hatchback} alt="" className="car-type-icon" />
            Hatchback
          </button>
          <button
            onClick={handleFilterButton}
            type="button"
            className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('SEDAN') && 'filter-active'}`}
            name="car_type"
            value="SEDAN"
          >
            <img src={Sedan} alt="" className="car-type-icon" />
            Sedan
          </button>
          <button
            onClick={handleFilterButton}
            type="button"
            className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('SUV') && 'filter-active'}`}
            name="car_type"
            value="SUV"
          >
            <img src={SUV} alt="" className="car-type-icon" />
            SUV
          </button>
        </div>
      </>
    );
  };
  const renderMobileFilterComponent = (sortBy: any, filterValue: any) => {
    return (
      <>
        <div className="bottom-filter mobile-view">
          <div className="d-flex justify-content-center ">
            <button
              className="button-box border-0 normal-text text-light header-footer-color"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
            >
              {filterIcon}&nbsp; filter
            </button>
          </div>
          <div className="offcanvas offcanvas-bottom vw-100 vh-100" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div className="offcanvas-header header-footer-color">
              <div className="offcanvas-title text-light heading-text heading-fw" id="offcanvasBottomLabel">
                FILTER
              </div>
              <button type="button" className="btn-close  border-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body " style={{ overflow: 'auto', marginBottom: '3.4rem' }}>
              <div className="border-bottom  p-3 pt-2 pb-4 ">
                <div className="heading-text heading-fw mb-2">Sort By</div>
                <div className="d-flex justify-content-between mb-3">{renderSortBy(sortBy, sortCategory1)}</div>
                <div className="d-flex justify-content-between">{renderSortBy(sortBy, sortCategory2)}</div>
              </div>
              <div className="border-bottom p-3 py-4 pt-1">
                <div className="d-flex justify-content-between pb-3">
                  <div className="heading-text heading-fw mb-2">Filter By</div>
                  <button className=" orange-text border-0 bg-transparent p-0 m-0 heading-text" onClick={handleReset}>
                    Reset
                  </button>
                </div>
                <div className="d-flex  ms-1">
                  <div className="col-3 d-flex justify-content-center ">
                    <img src={GasStation} alt="" className=" filter-icon" />
                  </div>
                  <div className="d-flex justify-content-start col-9">{renderFilter(filters.fuel_type, filterValue, 'fuel_type')}</div>
                </div>
              </div>
              <div className="border-bottom p-3 py-4 d-flex justify-content-between ms-1">
                <div className="col-3  d-flex justify-content-center">
                  <img src={Star} alt="" className=" filter-icon" />
                </div>
                <div className="d-flex justify-content-start col-9">{renderFilter(filters.car_rating, filterValue, 'car_rating', true)}</div>
              </div>
              <div className="border-bottom p-3 py-4 d-flex justify-content-between ms-1">
                <div className="col-3 d-flex justify-content-center">
                  <img src={Gear} alt="" className=" filter-icon" />
                </div>
                <div className="d-flex justify-content-start col-9">{renderFilter(filters.transmission_type, filterValue, 'transmission_type')}</div>
              </div>
              <div className="border-bottom p-3  py-4 d-flex justify-content-between ms-1">
                <div className="col-3 d-flex justify-content-center">
                  <img src={CarSeat} alt="" className=" filter-icon" />
                </div>
                <div className="d-flex justify-content-start col-9">{renderFilter(filters.seating_capacity, filterValue, 'seating_capacity', true)}</div>
              </div>
              <div className="p-3 py-4 d-flex justify-content-between">
                <button
                  onClick={handleFilterButton}
                  type="button"
                  className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('HATCHBACK') && 'filter-active'}`}
                  name="car_type"
                  value="HATCHBACK"
                >
                  <img src={Hatchback} alt="" className="car-type-icon" />
                  Hatchback
                </button>
                <button
                  onClick={handleFilterButton}
                  type="button"
                  className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('SEDAN') && 'filter-active'}`}
                  name="car_type"
                  value="SEDAN"
                >
                  <img src={Sedan} alt="" className="car-type-icon" />
                  Sedan
                </button>
                <button
                  onClick={handleFilterButton}
                  type="button"
                  className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('SUV') && 'filter-active'}`}
                  name="car_type"
                  value="SUV"
                >
                  <img src={SUV} alt="" className="car-type-icon" />
                  SUV
                </button>
              </div>
              <div className="mt-4 d-flex justify-content-center">
                <button type="button" className="heading-text button-box book-button-color border-0" data-bs-dismiss="offcanvas" aria-label="Close">
                  {' '}
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderCompare = () => {
    return (
      <>
        {compareCarIdList.length > 1 && (
          <div className="d-flex justify-content-end mt-4">
            {compareCarIdList.map((item: any) => {
              const { company_name, model, car_id } = item;
              return (
                <p
                  key={car_id}
                  className="m-0  d-flex align-items-center justify-content-center  mx-1 shadow-yellow normal-text button-box fw-semibold"
                  style={{ boxShadow: ' 0.1rem 0.1rem 0.5rem rgb(255, 153, 51)' }}
                >
                  {company_name}&nbsp;{model}
                </p>
              );
            })}
            <button
              className="button-box filter-button normal-text"
              style={{ backgroundColor: 'rgb(251,153,51' }}
              onClick={() => {
                handleCompareButton();
              }}
            >
              Compare
            </button>
          </div>
        )}
      </>
    );
  };
  const renderDateModal = () => {
    return (
      <>
        <button
          type="button"
          className="location-date-modal-button  heading-text d-md-flex justify-content-center m-0"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => {
            setmodalClass('');
          }}
        >
          <div className="heading-text date-char ms-4">
            {DateTimeView(DateTimeFormatter(startDateRef.current))} &nbsp;-&nbsp;
            {DateTimeView(DateTimeFormatter(endDateRef.current))}
          </div>
        </button>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="staticBackdropLabel">
                  The Journey Begins: Choose Your Journey Dates
                </h3>
                <button
                  type="button"
                  className="btn-close normal-text bg-transparent"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setmodalClass('modal-sticky-class');
                  }}
                ></button>
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
                    StoredDateTime={storedDateTime}
                  />
                </div>
              </div>
              <div className="modal-footer p-1">
                <button
                  type="button"
                  className="btn  normal-text bg-danger p-1 px-2 text-light"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setmodalClass('modal-sticky-class');
                  }}
                >
                  Close
                </button>
                <button type="button" className="btn  normal-text bg-primary p-1 px-2 text-light" data-bs-dismiss="modal" onClick={handleUpdateResult}>
                  Update Result
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderDateTime = () => {
    return (
      <>
        {timeDropdownToggle ? (
          <div className="d-md-flex main-card mobile-view w-100 bg-light">
            <div className="d-flex">
              <div className="w-75">
                <MapsLatLngs LocationData={LocationData} lat={tripDetailAttributes.lat} lng={tripDetailAttributes.lng} address={tripDetailAttributes.address} />
              </div>
              <div className="d-flex justify-content-end w-25">
                <button className="p-2 m-0 border-0 text-white header-footer-color" onClick={handleTimeDropdownButton}>
                  ↑
                </button>
              </div>
            </div>
            <div className="my-3">{renderDateModal()}</div>
            <div className="d-flex justify-content-center">
              <button type="button" className="p-1 normal-text button-box book-button-color border-0" onClick={handleSearch}>
                Update Results
              </button>
            </div>
          </div>
        ) : (
          <div className="mobile-view d-flex justify-content-between  border mx-2 mt-2 p-1 w-100 " style={{ backgroundColor: 'white' }}>
            <div className="">
              <p className="p-0 m-0">{tripDetailAttributes.address}</p>
              <div className="d-flex">
                <p className="p-0 m-0">{DateTimeViews(startDateRef.current)}</p>
                &nbsp;&nbsp;&nbsp;
                <p className="p-0 m-0">{DateTimeViews(endDateRef.current)}</p>
              </div>
            </div>
            <button className="p-2 m-0 border-0 text-white header-footer-color" onClick={handleTimeDropdownButton}>
              ↓
            </button>
          </div>
        )}

        <div className="d-md-flex main-card desktop-view bg-light" style={{ width: '100%', maxHeight: '4rem' }}>
          <div className="col-4" style={{ zIndex: '10' }}>
            <MapsLatLngs LocationData={LocationData} lat={tripDetailAttributes.lat} lng={tripDetailAttributes.lng} address={tripDetailAttributes.address} />
          </div>
          {renderDateModal()}
          <div>
            <button type="button" className="bg-transparent border-0 p-1" onClick={handleSearch}>
              {' '}
              {searchIcon}
            </button>
          </div>
        </div>
      </>
    );
  };
  const renderCarList = () => {
    return availableCarsDataList.map((items: any, index: any) => {
      const { car_id, model, images, color, company_name, transmission_type, fuel_type, car_type, year_of_manufacturing, base_price, km_driven, distance, car_status } = items;
      return (
        <section key={car_id} className={`main-card me-lg-5 ${car_status === 'booked' ? 'disabled position-relative' : ''}`}>
          {car_status === 'booked' ? (
            <div style={{ zIndex: '1000', top: '50%', left: '50%', transform: 'translate(-50%, -50%', color: 'red', position: 'absolute', fontSize: '1.25rem' }}>Booked</div>
          ) : null}
          <div className="d-flex  justify-content-between margin-space">
            <p className="p-0 m-0 me-2 lighter-text border-bottom flex-grow-1">
              {transmission_type}- {fuel_type}{' '}
            </p>
            <div className="d-flex justify-content-end ">
              <div className="small-text km-button heavy-text">{distance}kms away</div>
              <Checkbox
                sx={{
                  padding: '0 0 0 0.5rem'
                }}
                size="small"
                {...label}
                icon={<FavoriteBorder sx={{ width: '0.75rem' }} />}
                checkedIcon={<Favorite sx={{ width: '0.75rem' }} />}
                name="car_id"
                onChange={(e) => {
                  //   handleFavorite(car_id!, e);
                }}
              />
            </div>
          </div>
          <div className="d-flex ">
            <p className="m-0 heavy-text">
              {company_name} {model}
            </p>
            <p className="p-0 m-0 ms-2 lighter-text small-text d-flex align-items-end">
              {year_of_manufacturing} - {Math.round(km_driven / 1000)}K driven
            </p>
          </div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Rating
              size="small"
              name="text-feedback"
              value={4}
              readOnly
              precision={0.5}
              style={{ maxWidth: '0.6rem !important' }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>

          <div className="carousel-section">
            {images && images.length ? (
              <Carousel className="margin-space mx-auto carousel-box" showArrows={true}>
                {images.map((eachImage: any) => {
                  return (
                    <div key={Math.random()} className="carousel-car-image-box">
                      <img className="car-image" src={eachImage} />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <Carousel className="margin-space mx-auto carousel-box" showArrows={true}>
                <div className="h">
                  <img className="car-image" src={Rect} />
                </div>
                <div className="h">
                  <img className="car-image" src={Rect} />
                </div>
                <div className="h">
                  <img className="car-image" src={Rect} />
                </div>
              </Carousel>
            )}
          </div>

          <div className="d-flex justify-content-between ">
            <div className="d-flex align-items-center">
              <label className="small-text me-1" htmlFor="flexCheckDefault">
                Compare
              </label>
              <input
                type="checkbox"
                id={'flexCheckDefault' + `${car_id}`}
                onChange={(e) => {
                  handleCompare(e, car_id!, company_name!, model!);
                }}
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="p-0 m-0 me-2 heavy-text heading-text">₹{base_price}/-</div>
              {/* <Link to={`/carDet?${this.clicked(car_id!)}`}> */}
              {car_status === 'booked' ? (
                <button type="button" className="button-box book-button-color border-0 disabled">
                  <p className="p-0 m-0 heavy-text">Book Now</p>
                </button>
              ) : (
                <button
                  type="button"
                  className="button-box book-button-color border-0"
                  onClick={() => {
                    clicked(car_id!);
                  }}
                >
                  {' '}
                  <p className="p-0 m-0 heavy-text">Book Now</p>
                </button>
              )}

              {/* </Link> */}
            </div>
          </div>
        </section>
      );
    });
  };
  return (
    <div className="all-car-page container-fluid p-0 body-color">
      <div className="filter-section desktop-view  mt-4" style={{ position: 'sticky', top: '3.55rem' }}>
        {renderFilterComponent(sortBy, filterValue)}
      </div>
      <div className="mobile-view">{renderMobileFilterComponent(sortBy, filterValue)}</div>
      <section className=" mx-auto col-lg-8 col-sm-8 mt-lg-4 ms-lg-3">
        <div className={`d-flex justify-content-center ${modalClass}`}>{renderDateTime()}</div>
        <div>{renderCompare()}</div>
        {loader ? (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : availableCarsDataList!.length ? (
          <div className="car-cards-section">{renderCarList()}</div>
        ) : !availableCarsDataList!.length ? (
          <div className="car-cards-section">
            <h2> No Cars Available</h2>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default HomePage2;
