import './HomePage.css';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Checkbox, Rating, Slider, styled } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import Star from '../../assets/Star.png';
import Gear from '../../assets/Gear.png';
import Hatchback from '../../assets/Hatchback.png';
import Sedan from '../../assets/Sedan.png';
import SUV from '../../assets/SUV.png';
import Car_seat from '../../assets/Car-seat.png';
import GasStation from '../../assets/GasStation.png';
import UpArrow from '../../assets/up-arrow.png';
import DownArrow from '../../assets/down-arrow.png';
import { I_carData } from '../../types/Interfaces';
import { getCookie, setCookie } from '../../components/Cookies';
import { resolvePostApi, resolvePostApiWithHeaders } from '../../Common/ResolveApi';

import { getAvailableCarsQuery } from '../../graphqlQueries/CarDetailsQuery';
import { CustomerDetailsQuery, updateWishlistDetailsQuery } from '../../graphqlQueries/CustomerDetailsQuery';
import Rect from '../../assets/Rectangle2.png';
import { Carousel } from 'react-responsive-carousel';
import '../../components/carousel.css';
import MapsLatLngs from '../../components/MapsLatLnd';
import { Navigate } from 'react-router-dom';
import { filters, sortCategory1, sortCategory2 } from './HomePageConstants';
import withNavigateHook from '../Navigate';
import { DateTimeFormatter, DateTimeView, DateTimeViews } from '../../Common/DateTimeFormatter';
import PropTypes from 'prop-types';
import { fetchCarList, setSearchParams } from '../../redux/actionTypes/homePage';
import { setDateTime, setLocation } from '../../redux/actionTypes/landingPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimePicker from '../../components/DateTimePicker';

const value = 4;

interface I_filter {
  car_type: string[];
  fuel_type?: string;
  seating_capacity: string[];
  car_rating?: string;
  transmission_type?: string;
}
interface Props {
  navigate: (pathname: string, search: string) => void;
}
interface I_location {
  address?: any;
  lat?: any;
  lng?: any;
}
interface I_StoredDatetime {
  startDate?: Date;
  endDate?: Date;
}
interface IState {
  availableCarsDataList: I_carData[];
  token: string | null;
  favoriteData: any;
  starts: Date;
  ends: Date;
  lat: string;
  lng: string;
  address: string;
  compare: any[];
  showCompare: boolean;
  filterValue: I_filter;
  sortBy: string;
  location: I_location;
  timeDropdownButton: boolean;
  StoredDateTime: I_StoredDatetime;
}

class HomePage extends Component {
  static propTypes = {
    fetchCarList: PropTypes.func.isRequired
  };
  searchParams = new URLSearchParams(window.location.search);
  state: IState = {
    token: getCookie('Customer_access_token'),
    availableCarsDataList: [],
    favoriteData: [],
    starts: new Date(parseInt(this.searchParams.get('starts')!.replace('GMT ', 'GMT+')!, 10))!,
    ends: new Date(parseInt(this.searchParams.get('ends')!.replace('GMT ', 'GMT+')!, 10))!,
    lat: this.searchParams.get('lat')!,
    lng: this.searchParams.get('lng')!,
    address: this.searchParams.get('address')!,
    compare: [],
    showCompare: false,
    filterValue: {
      car_type: [],
      seating_capacity: []
    },
    sortBy: 'PRICE_LOW_TO_HIGH',
    location: {},
    timeDropdownButton: false,
    StoredDateTime: {}
  };
  filter: I_filter;
  dateRef: {
    startRef: any;
    endRef: any;
  };
  constructor(props: any) {
    super(props);
    this.filter = {
      car_type: [],
      seating_capacity: []
    };
    this.state.StoredDateTime = {
      startDate: new Date(this.state.starts),
      endDate: new Date(this.state.ends)
    };
    this.dateRef = {
      startRef: React.createRef(),
      endRef: React.createRef()
    };
    if (!sessionStorage.getItem('TripDuration')) {
      sessionStorage.setItem('TripDuration', JSON.stringify({ startDate: this.state.starts, endDate: this.state.ends }));
    }
    if (!getCookie('LocationValues')) {
      setCookie('LocationValues', JSON.stringify({ address: this.state.address, lat: this.state.lat, lng: this.state.lng }));
    }
  }

  static getDerivedStateFromProps(props: any, state: any) {
    return {
      ...state
    };
  }
  handleStartDateTime = (startDate: any) => {
    this.dateRef.startRef.current = startDate;
    // this.setState({ starts: startDate });
  };
  handleEndDateTime = (endDate: any) => {
    this.dateRef.endRef.current = endDate;
    // this.setState({ ends: endDate });
  };
  handleUpdateResult = async () => {
    await this.setState({ starts: this.dateRef.startRef.current, ends: this.dateRef.endRef.current });
    await this.getCarListData();
    sessionStorage.setItem('TripDuration', JSON.stringify({ startDate: this.state.starts, endDate: this.state.ends }));
    const props: any = this.props;
    const searchparams = `?lat=${this.state.lat}&lng=${this.state.lng}&address=${this.state.address.replaceAll(/ /g, '')}&starts=${this.state.starts.getTime()}&ends=${this.state.ends.getTime()}`;
    props.setSearchParams(searchparams);

    props.navigate({
      pathname: '/allCars',
      search: searchparams
    });
    this.state.StoredDateTime = {
      startDate: this.state.starts,
      endDate: this.state.ends
    };
  };
  async componentDidMount() {
    const { starts, ends, lat, lng, address, filterValue, sortBy } = this.state;
    await this.getCarListData();
    this.setState({ starts: this.dateRef.startRef.current, ends: this.dateRef.endRef.current });

    //this.dateString(starts, ends);
    // sessionStorage.setItem('Values', JSON.stringify({ address, lat, lng, starts, ends }));
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    return null;
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: any, snapshot: any) {
    // const { starts, ends, lat, lng, address, filterValue, sortBy } = this.state;
    // if (this.state.starts !== prevState.starts || this.state.ends !== prevState.ends) {
    //   const props: any = this.props;
    //   const searchparams = `?lat=${this.state.lat}&lng=${this.state.lng}&address=${this.state.address}&starts=${this.state.starts}&ends=${this.state.ends}`;
    //   props.setSearchParams(searchparams);

    //   props.navigate({
    //     pathname: '/allcars',
    //     search: searchparams
    //   });
    // }
    if (this.state.compare !== prevState.compare) {
      if (this.state.compare.length < 3 && this.state.compare.length > 1) {
        this.setState({ showCompare: true });
      } else if (this.state.compare.length < 2) {
        this.setState({ showCompare: false });
      }
    }
    if (this.state.location !== prevState.location) {
      this.setState({ lat: this.state.location.lat, lng: this.state.location.lng, address: this.state.location.address });
    }
    // if (this.state.filterValue !== prevState.filterValue || this.state.sortBy !== prevState.sortBy) {
    //   this.getData(starts, ends, lat, lng, sortBy, filterValue);
    // }
  }

  getCarListData = async () => {
    try {
      const { starts, ends, lat, lng, sortBy, filterValue } = this.state;
      const props: any = this.props;
      props.fetchCarList(starts, ends, lat, lng, sortBy, filterValue);
      // const { getAvailableCars } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getAvailableCarsQuery(starts, ends, lat, lng, sortBy, filterValue));
      // const { startDate, endDate } = this.dateString(starts, ends);
      // this.setState({
      //   //   availableCarsDataList: getAvailableCars,
      //   startDate,
      //   endDate
      // });
    } catch (error) {
      console.log(error);
    }
  };

  getWishlist = async (car_number: string) => {
    try {
      const { updateWishlistDetails } = await resolvePostApiWithHeaders(import.meta.env.VITE_BACKEND_BASE_URL, updateWishlistDetailsQuery(car_number), this.state.token);
      this.setState({ favoriteData: updateWishlistDetails.wishlist });
    } catch (error) {
      console.log(error);
    }
  };

  PrettoSlider = styled(Slider)({
    color: 'rgb(255, 153, 51)'
  });

  LocationData = (address?: any, lat?: any, lng?: any) => {
    this.setState({ location: { ...this.state.location, address: address, lat: lat, lng: lng } });
  };
  handleSearch = async () => {
    const { address, lat, lng } = this.state;
    await this.setState({ starts: this.dateRef.startRef.current, ends: this.dateRef.endRef.current, timeDropdownButton: false });
    await this.getCarListData();
    setCookie('LocationValues', JSON.stringify({ address: address, lat: lat, lng: lng }));
    sessionStorage.setItem('TripDuration', JSON.stringify({ startDate: this.state.starts, endDate: this.state.ends }));
    const props: any = this.props;
    const searchparams = `?lat=${this.state.lat}&lng=${this.state.lng}&address=${this.state.address.replaceAll(/ /g, '')}&starts=${this.state.starts.getTime()}&ends=${this.state.ends.getTime()}`;
    props.setSearchParams(searchparams);
    props.setDateTime(this.state.starts, this.state.ends);
    props.setLocation(address, lat, lng);
    props.navigate({
      pathname: '/allCars',
      search: searchparams
    });
  };

  //COMPARE AND WISHLIST SECTION

  handleCompare = (e: React.SyntheticEvent<Element, Event>, car_id: string, company_name: string, model: string) => {
    const { checked }: any = e.target;
    if (checked) {
      {
        if (this.state.compare.length < 3) {
          const newItem = { car_id: car_id, company_name: company_name, model: model };
          const UpdatedArray = [...this.state.compare, newItem];
          this.setState({ compare: UpdatedArray });
        } else {
          alert('Cannot compare more than 3 cars at once');
        }
      }
    } else if (!checked) {
      if (this.state.compare.length) {
        const updatedArray = this.state.compare.filter((item: any) => item.car_id !== car_id);
        this.setState({ compare: updatedArray });
      }
    }
  };
  handleCompareButton = (compare: any) => {
    const props: any = this.props;
    props.navigate({
      pathname: '/compare',
      search: `?compare=${JSON.stringify(compare)}&lat=${this.state.lat}&lng=${this.state.lng}&address=${this.state.address}&starts=${this.state.starts}&ends=${this.state.ends}`
    });
  };
  handleFavorite = (car_id: any, e: any) => {};

  clicked = (car_id: string) => {
    const props: any = this.props;
    // const startD = new Date(this.state.starts)
    const searchparams = `?car_id=${car_id}&lat=${this.state.lat}&lng=${this.state.lng}&address=${this.state.address}&starts=${this.state.starts.getTime()}&ends=${this.state.ends.getTime()}`;
    props.setSearchParams(searchparams);
    props.navigate({
      pathname: '/billing',
      search: searchparams
    });
  };

  // FILTER SECTION
  handleSort = async (e: any) => {
    const { starts, ends, lat, lng, sortBy } = this.state;
    const sortby = e.target.value;
    this.setState(
      {
        sortBy: sortby
      },
      async () => {
        await this.getCarListData();
      }
    );
  };
  handleFilterButton = async (e: any) => {
    const { className, name, value } = e.target;
    const filter: any = { ...this.state.filterValue };
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

    this.filter = filter;
    this.setState({ filterValue: this.filter }, async () => {
      await this.getCarListData();
    });
  };
  handleReset = async () => {
    const filter: any = { car_type: [], seating_capacity: [] };
    this.filter = filter;
    this.setState({ filterValue: this.filter }, async () => {
      await this.getCarListData();
    });
  };
  FilterProp = (filterData: any) => {
    this.setState({ filterValue: filterData });
  };

  // V: any = getCookie('LocationValues');
  // Values = JSON.parse(this.V);
  // latData: any = this.Values ? this.Values.lat : null;
  // lngData: any = this.Values ? this.Values.lng : null;
  // addressData: any = this.Values ? this.Values.address : null;
  // place = 'Search you location';
  handleTimeDropdownButton = () => {
    if (!this.state.timeDropdownButton) {
      this.setState({ timeDropdownButton: true });
    } else {
      this.setState({ timeDropdownButton: false });
    }
  };

  label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  filterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-funnel" viewBox="0 0 16 16">
      <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
    </svg>
  );
  searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" id="search">
      <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
    </svg>
  );

  renderCarList = () => {
    const props: any = this.props;
    const { availableCarsDataList } = props;
    const carList = availableCarsDataList.map((items: any, index: any) => {
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
                {...this.label}
                icon={<FavoriteBorder sx={{ width: '0.75rem' }} />}
                checkedIcon={<Favorite sx={{ width: '0.75rem' }} />}
                name="car_id"
                onChange={(e) => {
                  this.handleFavorite(car_id!, e);
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
                  this.handleCompare(e, car_id!, company_name!, model!);
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
                    this.clicked(car_id!);
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
    return carList;
  };
  renderSortBy = (sortBy: any, category: any) => {
    const sortByList = category.map((item: any) => {
      const name = item.name;
      const id = item.id;
      return (
        <div key={id}>
          <button onClick={this.handleSort} type="button" className={`normal-text button-box filter-button filter-fixed-width-button ${sortBy === name && 'filter-active'}`} value={item.name}>
            {item.value}
          </button>
        </div>
      );
    });
    return sortByList;
  };

  renderFilter = (filter: any, filterValue: any, key: string, noFixWidth = false) => {
    const filterList = filter.map((item: any) => {
      const name = item.name;
      const value = item.value;
      const id = item.id;
      let className;
      className = `normal-text button-box filter-button filter-fixed-width-button filter-btn-mar ${filterValue[key] === value && 'filter-active'}`;
      if (noFixWidth) {
        className = `normal-text button-box filter-button filter-btn-mar ${filterValue[key] === value && 'filter-active'}`;
        if (key === 'seating_capacity') className = `normal-text button-box filter-button  filter-btn-mar ${filterValue[key].includes(value) && 'filter-active'}`;
      }
      return (
        <div key={id}>
          <button onClick={this.handleFilterButton} type="button" className={className} name={name} value={value}>
            {item.displayValue}
          </button>
        </div>
      );
    });
    return filterList;
  };
  renderFilterComponent = (sortBy: any, filterValue: any) => {
    return (
      <>
        <div className="border-bottom p-3 pt-2 ">
          <div className="heading-text heading-fw mb-2">Sort By</div>
          <div className="d-flex justify-content-between mb-3">{this.renderSortBy(sortBy, sortCategory1)}</div>
          <div className="d-flex justify-content-between">{this.renderSortBy(sortBy, sortCategory2)}</div>
        </div>
        <div className="border-bottom p-3 pt-1">
          <div className="d-flex justify-content-between">
            <div className="heading-text heading-fw mb-2">Filter By</div>
            <button className=" orange-text border-0 bg-transparent p-0 m-0 heading-text" onClick={this.handleReset}>
              Reset
            </button>
          </div>
          <div className="d-flex  ms-1">
            <div className="col-3 d-flex justify-content-center">
              <img src={GasStation} alt="" className=" filter-icon" />
            </div>
            <div className="d-flex justify-content-between col-9">{this.renderFilter(filters.fuel_type, filterValue, 'fuel_type')}</div>
          </div>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between ms-1">
          <div className="col-3  d-flex justify-content-center">
            <img src={Star} alt="" className=" filter-icon" />
          </div>
          <div className="d-flex justify-content-between col-9">{this.renderFilter(filters.car_rating, filterValue, 'car_rating', true)}</div>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between ms-1">
          <div className="col-3 d-flex justify-content-center">
            <img src={Gear} alt="" className=" filter-icon" />
          </div>
          <div className="d-flex justify-content-between col-9">{this.renderFilter(filters.transmission_type, filterValue, 'transmission_type')}</div>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between ms-1">
          <div className="col-3 d-flex justify-content-center">
            <img src={Car_seat} alt="" className=" filter-icon" />
          </div>
          <div className="d-flex justify-content-between col-9">{this.renderFilter(filters.seating_capacity, filterValue, 'seating_capacity', true)}</div>
        </div>
        <div className="p-3 d-flex justify-content-between">
          <button
            onClick={this.handleFilterButton}
            type="button"
            className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('HATCHBACK') && 'filter-active'}`}
            name="car_type"
            value="HATCHBACK"
          >
            <img src={Hatchback} alt="" className="car-type-icon" />
            Hatchback
          </button>
          <button
            onClick={this.handleFilterButton}
            type="button"
            className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('SEDAN') && 'filter-active'}`}
            name="car_type"
            value="SEDAN"
          >
            <img src={Sedan} alt="" className="car-type-icon" />
            Sedan
          </button>
          <button
            onClick={this.handleFilterButton}
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
  renderMobileFilterComponent = (sortBy: any, filterValue: any) => {
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
              {this.filterIcon}&nbsp; filter
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
                <div className="d-flex justify-content-between mb-3">{this.renderSortBy(sortBy, sortCategory1)}</div>
                <div className="d-flex justify-content-between">{this.renderSortBy(sortBy, sortCategory2)}</div>
              </div>
              <div className="border-bottom p-3 py-4 pt-1">
                <div className="d-flex justify-content-between pb-3">
                  <div className="heading-text heading-fw mb-2">Filter By</div>
                  <button className=" orange-text border-0 bg-transparent p-0 m-0 heading-text" onClick={this.handleReset}>
                    Reset
                  </button>
                </div>
                <div className="d-flex  ms-1">
                  <div className="col-3 d-flex justify-content-center ">
                    <img src={GasStation} alt="" className=" filter-icon" />
                  </div>
                  <div className="d-flex justify-content-start col-9">{this.renderFilter(filters.fuel_type, filterValue, 'fuel_type')}</div>
                </div>
              </div>
              <div className="border-bottom p-3 py-4 d-flex justify-content-between ms-1">
                <div className="col-3  d-flex justify-content-center">
                  <img src={Star} alt="" className=" filter-icon" />
                </div>
                <div className="d-flex justify-content-start col-9">{this.renderFilter(filters.car_rating, filterValue, 'car_rating', true)}</div>
              </div>
              <div className="border-bottom p-3 py-4 d-flex justify-content-between ms-1">
                <div className="col-3 d-flex justify-content-center">
                  <img src={Gear} alt="" className=" filter-icon" />
                </div>
                <div className="d-flex justify-content-start col-9">{this.renderFilter(filters.transmission_type, filterValue, 'transmission_type')}</div>
              </div>
              <div className="border-bottom p-3  py-4 d-flex justify-content-between ms-1">
                <div className="col-3 d-flex justify-content-center">
                  <img src={Car_seat} alt="" className=" filter-icon" />
                </div>
                <div className="d-flex justify-content-start col-9">{this.renderFilter(filters.seating_capacity, filterValue, 'seating_capacity', true)}</div>
              </div>
              <div className="p-3 py-4 d-flex justify-content-between">
                <button
                  onClick={this.handleFilterButton}
                  type="button"
                  className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('HATCHBACK') && 'filter-active'}`}
                  name="car_type"
                  value="HATCHBACK"
                >
                  <img src={Hatchback} alt="" className="car-type-icon" />
                  Hatchback
                </button>
                <button
                  onClick={this.handleFilterButton}
                  type="button"
                  className={`normal-text button-box filter-button car-type-button p-1 ${filterValue.car_type?.includes('SEDAN') && 'filter-active'}`}
                  name="car_type"
                  value="SEDAN"
                >
                  <img src={Sedan} alt="" className="car-type-icon" />
                  Sedan
                </button>
                <button
                  onClick={this.handleFilterButton}
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
  renderCompare = (showCompare: Boolean, compare: any) => {
    return (
      <>
        {showCompare && (
          <div className="d-flex justify-content-end mt-4">
            {compare.map((item: any) => {
              const { company_name, model, car_id } = item;
              return (
                <p
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
                this.handleCompareButton(compare);
              }}
            >
              Compare
            </button>
          </div>
        )}
      </>
    );
  };
  renderDateModal = () => {
    const { StoredDateTime, starts, ends } = this.state;
    return (
      <>
        <button type="button" className="location-date-modal-button  heading-text d-md-flex justify-content-center m-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <div className="heading-text date-char ms-4">
            {DateTimeView(DateTimeFormatter(starts))} &nbsp;-&nbsp;
            {DateTimeView(DateTimeFormatter(ends))}
          </div>
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
                    startDate={this.handleStartDateTime}
                    endDate={this.handleEndDateTime}
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
                <button type="button" className="btn  normal-text bg-primary p-1 px-2 text-light" data-bs-dismiss="modal" onClick={this.handleUpdateResult}>
                  Update Result
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  renderDateTime = () => {
    const { timeDropdownButton, StoredDateTime, address, starts, ends, lat, lng } = this.state;
    return (
      <>
        {timeDropdownButton ? (
          <div className="d-md-flex main-card mobile-view w-100">
            <div className="d-flex">
              <div className="w-75">
                <MapsLatLngs LocationData={this.LocationData} lat={lat} lng={lng} address={address} />
              </div>
              <div className="d-flex justify-content-end w-25">
                <button className="p-2 m-0 border-0 text-white header-footer-color" onClick={this.handleTimeDropdownButton}>
                  ↑
                </button>
              </div>
            </div>
            <div className="my-3">{this.renderDateModal()}</div>
            <div className="d-flex justify-content-center">
              <button type="button" className="p-1 normal-text button-box book-button-color border-0" onClick={this.handleSearch}>
                Update Results
              </button>
            </div>
          </div>
        ) : (
          <div className="mobile-view d-flex justify-content-between  border mx-3 mt-2 w-100">
            <div className="">
              <p className="p-0 m-0">{address}</p>
              <div className="d-flex">
                <p className="p-0 m-0">{DateTimeViews(starts)}</p>
                &nbsp;&nbsp;&nbsp;
                <p className="p-0 m-0">{DateTimeViews(ends)}</p>
              </div>
            </div>
            <button className="p-2 m-0 border-0 text-white header-footer-color" onClick={this.handleTimeDropdownButton}>
              ↓
            </button>
          </div>
        )}

        <div className="d-md-flex main-card desktop-view" style={{ width: '100%' }}>
          <div className="col-4">
            <MapsLatLngs LocationData={this.LocationData} lat={lat} lng={lng} address={address} />
          </div>
          {this.renderDateModal()}
          <div>
            <button type="button" className="bg-transparent border-0 p-1" onClick={this.handleSearch}>
              {' '}
              {this.searchIcon}
            </button>
          </div>
        </div>
      </>
    );
  };
  /**** FILTER SECTION END****/
  render() {
    const { filterValue, sortBy, showCompare, compare, lat, lng, address, StoredDateTime, starts, ends, timeDropdownButton } = this.state;
    const props: any = this.props;
    const { availableCarsDataList } = props;

    return (
      <div className="all-car-page container-fluid p-0 body-color">
        <div className="filter-section desktop-view  mt-4">{this.renderFilterComponent(sortBy, filterValue)}</div>
        <div className="mobile-view">{this.renderMobileFilterComponent(sortBy, filterValue)}</div>
        <section className=" mx-auto col-lg-8 col-sm-8 mt-lg-4 ms-lg-3">
          <div className="d-flex justify-content-center">{this.renderDateTime()}</div>
          <div>{this.renderCompare(showCompare, compare)}</div>
          <div className="car-cards-section">{availableCarsDataList.length ? <>{this.renderCarList()}</> : <h2> No Cars Available</h2>}</div>
        </section>

        {/* <BottomFilterMobile Filter={this.FilterProp} /> */}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    availableCarsDataList: state.homePageReducer.availableCarsDataList,
    searchParams: state.homePageReducer.searchParams
  };
};
// const mapDispatchToProps = (dispatch:any) => {
//   return bindActionCreators ({ fetchCarList }, dispatch);
// };

const mapDispatchToProps = {
  fetchCarList,
  setSearchParams,
  setDateTime,
  setLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(withNavigateHook(HomePage));
//{`car-card ${CarStatus === 'Booked' ? 'disabled position-relative' : ''}`}
