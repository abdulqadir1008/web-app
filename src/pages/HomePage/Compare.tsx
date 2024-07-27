import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCarDetailsQuery } from '../../graphqlQueries/CarDetailsQuery';

import { resolvePostApi } from '../../Common/ResolveApi';

interface I_carData {
  car_number: string;
  company_name: string;
  model: string;
  fuel_type: string;
}

const Compare = (props: any) => {
  const [SearchParams] = useSearchParams({ compare: '', lat: '', lng: '', address: '', starts: '', ends: '' });
  let compare = SearchParams.get('compare');
  let lat = SearchParams.get('lat');
  let lng = SearchParams.get('lng');
  let address = SearchParams.get('address');
  let starts = SearchParams.get('starts');
  let ends = SearchParams.get('ends');
  const compareArray = JSON.parse(compare!);
  // const location = useLocation();
  // const {
  //   state: { compare }
  // } = location;

  const [carData, setCarData] = useState<any[]>([]);
  const navigate = useNavigate();
  const getData = async (compareArray: any, starts: any, ends: any) => {
    try {
      let carDetailsArray = [];
      for (let eachNumber of compareArray) {
        const { car_id } = eachNumber;
        const { getCarDetails } = await resolvePostApi(import.meta.env.VITE_BACKEND_BASE_URL, getCarDetailsQuery(car_id, starts, ends));
        carDetailsArray.push(getCarDetails);
      }
      setCarData(carDetailsArray);
    } catch (error) {}
  };

  useEffect(() => {
    getData(compareArray, starts, ends);
  }, []);

  const clicked = (car_id: string) => {
    const searchparams = `?car_id=${car_id}&lat=${lat}&lng=${lng}&address=${address}&starts=${starts}&ends=${ends}`;
    navigate({
      pathname: '/billing',
      search: searchparams
    });
  };
  return (
    <>
      <div className="d-flex justify-content-center col-9 mx-auto my-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: 'rgba(152, 152, 152, 0.1)' }}>
              <TableRow>
                <TableCell align="left" className="fw-semibold">
                  Car
                </TableCell>
                <TableCell align="left" className="fw-semibold">
                  Model
                </TableCell>
                <TableCell align="left" className="fw-semibold">
                  Car Type
                </TableCell>
                <TableCell align="left" className="fw-semibold">
                  Fuel Type
                </TableCell>
                <TableCell align="left" className="fw-semibold">
                  Transmission Type
                </TableCell>
                <TableCell align="left" className="fw-semibold">
                  Year Of Manufacturing
                </TableCell>
                <TableCell align="left" className="fw-semibold">
                  Book
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carData.map((items) => {
                const { fuel_type, model, company_name, car_type, year_of_manufacturing, transmission_type, car_id } = items;
                return (
                  <TableRow key={car_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {company_name}
                    </TableCell>
                    <TableCell align="left">{model}</TableCell>
                    <TableCell align="left">{car_type}</TableCell>
                    <TableCell align="left">{fuel_type}</TableCell>
                    <TableCell align="left">{transmission_type}</TableCell>
                    <TableCell align="left">{year_of_manufacturing}</TableCell>
                    <TableCell align="left">
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div className="d-flex m-5 p-0 main-card rounded-4 overflow-hidden" style={{ maxWidth: 'fit-content' }}>
          <div className="" style={{ backgroundColor: '#ffffff', width: '15vw ' }}>
            <div className="d-flex justify-content-center align-items-center">
              <h3 className="m-2 mt-3">Feature</h3>
            </div>
            <hr />
            <div>
              <p className="p-2 fw-semibold d-flex justify-content-center align-items-center">Price</p>
              <hr />
              <p className="p-2 fw-semibold d-flex justify-content-center align-items-center">Car Type</p>
              <hr />
              <p className="p-2 fw-semibold d-flex justify-content-center align-items-center">Fuel Type</p>
              <hr />
              <p className="p-2 fw-semibold d-flex justify-content-center align-items-center">Car Age</p>
              <hr />
              <p className="p-2 fw-semibold d-flex justify-content-center align-items-center">Driving Type</p>
            </div>
          </div>
          {carData.map((items) => {
            const { car_number, fuel_type, model, company_name, car_type, year_of_manufacturing, transmission_type } = items;
            return (
              <div key={car_number} className=" border border-start-1 border-end-0 border-top-0 border-bottom-0" style={{ width: '20vw', borderColor: 'gray' }}>
                <div className="d-flex justify-content-center align-items-center">
                  <h3 className="m-2 mt-3">{company_name}</h3>
                </div>
                <hr />
                <div>
                  <p className="p-2 d-flex justify-content-center align-items-center">{model}</p>
                  <hr />
                  <p className="p-2 d-flex justify-content-center align-items-center">{car_type}</p>
                  <hr />
                  <p className="p-2 d-flex justify-content-center align-items-center ">{fuel_type}</p>
                  <hr />
                  <p className="p-2 d-flex justify-content-center align-items-center">{year_of_manufacturing}</p>
                  <hr />
                  <p className="p-2 d-flex justify-content-center align-items-center">{transmission_type}</p>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default Compare;
