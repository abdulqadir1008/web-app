import * as React from 'react';
import ProfileImage from '../../assets/ProfileIconBM.png';
const AboutUs = () => {
  return (
    <div className="container-fluid p-0 about-us-body m-0">
      <div className=" d-flex justify-content-center " style={{ padding: '1.5rem 0' }}>
        <div className="col-9">
          <h1 className="d-flex justify-content-center " style={{ fontSize: '2rem', margin: '1.5rem 0' }}>
            Mission
          </h1>
          <p className="d-flex justify-content-center normal-text">Our mission is “to provide a reliable mobility platform”</p>
          <h1 className="d-flex justify-content-center " style={{ fontSize: '2rem', margin: '1.5rem 0' }}>
            Vision
          </h1>
          <p className="d-flex justify-content-center about-us-normal-text normal-text">Our mission is “to serve the modern needs"</p>
          <h1 className="d-flex justify-content-center " style={{ fontSize: '2rem', margin: '2rem 0' }}>
            Our Story
          </h1>
          <div>
            <p className="about-us-normal-text" style={{ marginTop: '3rem' }}>
              The story begins with little questions:
            </p>
            <ol className="about-us-normal-text normal-text" style={{ margin: ' 0 0 3rem 1rem ' }}>
              <li>Can I get a self-drive rental car in any city at any time?</li>
              <li>Can you guarantee the look and feel of the car?</li>
              <li>Can I get class experience with rental cars too?</li>
            </ol>
            <p className="d-flex justify-content-center about-us-normal-text heading-text">Every time we end with a BIG NO!!!</p>
            <p className="d-flex justify-content-center about-us-normal-text heading-text">
              Then we decided why can’t give it to the world? And Infila was born to answer all the questions with a BIG YES.
            </p>
            <p className="d-flex justify-content-center about-us-normal-text heading-text">Infila is the one-stop solution for all your luxurious rides.</p>
          </div>
          <h1 className="d-flex justify-content-center " style={{ fontSize: '2rem', margin: '2rem 0' }}>
            Values and principles
          </h1>
          <div>
            <p className="m-0 p-0 heading-text" style={{ fontWeight: '500' }}>
              Technology is money
            </p>
            <p className="about-us-normal-text">We believe technology will save time and we use it wisely to prove “Time is Money”.</p>
            <p className="m-0 p-0 heading-text" style={{ fontWeight: '500' }}>
              Expanding access
            </p>
            <p className="about-us-normal-text">We believe in expanding mobility access around the globe - anywhere and anytime.</p>
            <p className="m-0 p-0 heading-text" style={{ fontWeight: '500' }}>
              Providing choice
            </p>
            <p className="about-us-normal-text">We believe flexibility and choice boost the freedom of choice and we strive to provide.</p>
            <p className="m-0 p-0 heading-text" style={{ fontWeight: '500' }}>
              Delivering reliability
            </p>
            <p className="about-us-normal-text">We believe reliability comes with great responsibilities and we will be always ready to handle it.</p>
            <p className="m-0 p-0 heading-text" style={{ fontWeight: '500' }}>
              Open for collaboration{' '}
            </p>
            <p className="about-us-normal-text">We believe deep collaboration accelerates reaching the goals.</p>
          </div>
          <h1 className="d-flex justify-content-center " style={{ fontSize: '2rem', margin: '1rem 0' }}>
            Our Team
          </h1>
          <div className="d-flex" style={{ margin: '3rem 0' }}>
            <img src={ProfileImage} className="rounded-circle border border-dark bg-dark" alt="" style={{ width: '7rem', marginRight: '3rem' }} />
            <div>
              <p className="m-0 p-0" style={{ fontWeight: '500' }}>
                Rahul Cheedela
              </p>
              <p className="m-0 p-0" style={{ color: '#7b7b7b' }}>
                Co-founder & CFO
              </p>
              <p className="m-0 p-0">
                One financial pillar of the company and working hard to keep the company alive. He comes from a business background family and is an alumna of SRM University – Chennai. He served as
                XYZ in the
              </p>
            </div>
          </div>
          <div className="d-flex" style={{ margin: '3rem 0' }}>
            <div>
              <p className="m-0 p-0" style={{ fontWeight: '500' }}>
                Abdul Qadir
              </p>
              <p className="m-0 p-0" style={{ color: '#7b7b7b' }}>
                Fullstack Developer
              </p>
              <p className="p-0 m-0">
                We can call him hidden GEM!!!. The one handling the end-to-end flow of the application. Live example of “Practice makes a man perfect” In fact, you are reading this on the web
                application that he developed.
              </p>
            </div>
            <img src={ProfileImage} className="rounded-circle border border-dark bg-dark" alt="" style={{ width: '7rem', marginLeft: '3rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
