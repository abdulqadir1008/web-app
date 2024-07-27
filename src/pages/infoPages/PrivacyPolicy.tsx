import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container ">
      <h2 className="d-flex justify-content-center text-decoration-underline mb-5 mt-3">Privacy Policies</h2>
      <p className="p-o m-0 heading-text">
        <ol>
          <li>
            Collection of personal information: The self-driving car company may collect personal information from you such as your name, contact details, payment information, and driver's license
            details. This information is necessary to identify you as a customer and to provide you with the requested service.
          </li>
          <li>
            Use of personal information: The self-driving car company may use your personal information for the following purposes: a. To process your booking and payment b. To communicate with you
            regarding your rental c. To provide customer service and support d. To improve the service and user experience e. To comply with legal and regulatory requirements.
          </li>
          <li>
            Disclosure of personal information: The self-driving car company may disclose your personal information to third parties in the following circumstances: a. To its employees, agents, and
            service providers to provide the rental service b. To law enforcement agencies, government authorities, or other third parties to comply with legal or regulatory requirements c. To credit
            card companies and payment processors to process your payment d. To its affiliates and partners to provide you with related products and services.
          </li>
          <li>
            Data security: The self-driving car company will take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. This may include physical,
            electronic, and procedural safeguards.
          </li>
          <li>Data retention: The self-driving car company may retain your personal information for as long as necessary to provide the service or as required by law.</li>
          <li>
            Use of GPS and other tracking technology: The self-driving car company may use GPS and other tracking technology to track the vehicle and your location. This information is used to provide
            the service, improve the service, and to comply with legal and regulatory requirements.
          </li>
          <li>Consent: By using the self-driving car company's service, you consent to the collection, use, and disclosure of your personal information in accordance with the privacy policy.</li>
        </ol>
      </p>
      <p className="p-o m-0 heading-text">
        <span className='text-danger'>*</span> It's important to note that each self-driving car company may have their own specific privacy policy, and it's important to carefully review and understand their policies before using their
        service.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
