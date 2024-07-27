import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="container-fluid  d-flex align-items-center vh-100" style={{ paddingBottom: '10rem' }}>
      {/* <div className="shadow-yellow border rounded-4 container" style={{ width: '95%', height: 'auto' }}>
        <div className=" m-5">
          <div className="profile-normal-text" style={{ width: '11rem' }}>
            Name:
          </div>
          <input type="text" className="inp" style={{ width: '22rem' }} />
        </div>
        <div className="d-lg-flex d-md-flex">
          <div className=" m-5">
            <div className="profile-normal-text" style={{ width: '11rem' }}>
              Email Id:
            </div>
            <input type="email" className="inp" style={{ width: '22rem' }} />
          </div>
          <div className=" m-5">
            <div className="profile-normal-text" style={{ width: '11rem' }}>
              Phone Number:
            </div>
            <input type="number" className="inp" style={{ width: '22rem' }} />
          </div>
        </div>
        <div className="col-lg-12 d-flex m-5">
          <div className="profile-normal-text align-items-top" style={{ width: '11rem' }}>
            Query:
          </div>
          <textarea
            placeholder="Enter Your Query......"
            id=""
            className="shadow-yellow border rounded-4 container col-lg-10  p-3"
            style={{ width: '80%', height: '15rem', resize: 'none' , margin:'0'}}
          ></textarea>
        </div>
        <div className="m-5 d-flex justify-content-center">
          <button className="upd-btn">Submit</button>
        </div>
      </div> */}
      <div className="shadow-yellow border rounded-4 container d-flex mt-5" style={{ width: '95%', height: 'auto' }}>
        <div className="m-4 p-2">
          <label className="heading-text">Customer care:</label>
          <p className="heading-text mx-3 text-danger">+91 9441180086</p>
          <br />
          <label className="heading-text">Email-id:</label>
          <p className="heading-text mx-3 text-danger">support@infila.in / query@infila.in</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
