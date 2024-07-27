import React from 'react';

const CancellationPage = () => {
  return (
    <div className="container ">
      <h2 className="d-flex justify-content-center text-decoration-underline mb-5 mt-3">Cancellation and Refund Policy</h2>
      <h3 className=" text-decoration-underline ">CANCELLATION CHARGES:</h3>
      <p>
        <ul>
          <li>100% refund if canceled before 24 hours of the trip start time.</li>
          <li>Flat 500/- will be deducted if canceled between 24 - 8 hours of the trip start time. </li>
          <li>50% of the booking amount will be deducted if canceled between 8 - 3 hours of the trip start time. </li>
          <li>No refund if canceled within 3 hours of the trip start time. </li>
        </ul>
      </p>
      <h3 className=" text-decoration-underline">FUEL:</h3>
      <p>500/- penalty will be levied if the car’s return fuel reading is less than the pickup fuel reading.</p>
      <h3 className=" text-decoration-underline">CHALLANS/ FASTAG:</h3>
      <p>
        <ul>
          <li>The customer is responsible for all fastag and the government challenges levied during the trip.</li>
          <li>The outstanding amount should be cleared within 30 days of the fastag/ challans raised date.</li>
        </ul>
      </p>
      <h3 className=" text-decoration-underline">OTHER CHARGES:</h3>
      <p>
        <ul>
          <li>1000/- penalty if smoking inside the car.</li>
          <li>500/- penalty if car is not clean.</li>
          <li>1000/- + replacement charges if car key not returned.</li>
          <li>500/- if not returned to the pickup location/ parked at wrong location.</li>
        </ul>
      </p>
    </div>
  );
};

export default CancellationPage;
