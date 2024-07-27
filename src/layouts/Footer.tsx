import React from 'react';
import WhatsApp from '../assets/whatsapp.png';
import Facebook from '../assets/facebook.png';
import Instagram from '../assets/instagram.png';
import LinkedIn from '../assets/linkedin.png';
import { Link } from 'react-router-dom';
import AppStore from '../assets/app-store.svg';
import PlayStore from '../assets/google-play.svg';
import Pinterest from '../assets/pinterest.png';
import HeadersLogo from '../assets/HeadersLogo.png';
import Twitter from '../assets/twitter.png';
import './Layout.css';
function Footer() {
  return (
    <footer className="footer header-footer-color">
      <div className="container p-4 py-2 pt-lg-4 mx-auto">
        <div className="row">
          <div className="mobile-footer mobile-view ">
            <div className="col-lg-3 col-6 col-6 mb-4 mb-md-0 pb-md-3 footer-text">
              <img src={HeadersLogo} alt="..." className="footer-logo mb-3" />
              <h3>Hyderabad, Telangana, India</h3>
            </div>
            <div className="col-lg-3 col-6 mb-4 mb-md-0 pb-md-3 footer-text ">
              <div className="heading-text heading-fw mb-2">Our Mobile App</div>
              <p className="blinking-text m-0 p-0 heading-text">Coming Soon</p>
              <div>
                <img src={PlayStore} className="disabled" alt="" style={{ width: '5rem', marginTop: '1.2rem' }} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <img src={AppStore} className="disabled" alt="" style={{ width: '5rem', marginTop: '1.2rem' }} />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-6 col-6 mb-4 mb-md-0 pb-md-3 footer-text desktop-view">
            <img src={HeadersLogo} alt="..." className="footer-logo mb-3" />
            <h3>Hyderabad, Telangana, India</h3>
          </div>
          <div className="d-flex col-lg-3  col-6 mb-2 mb-md-0 pb-md-3">
            <ul className="footer-text normal-text list-unstyled">
              <div className="heading-text fw-bold">Navigation</div>
              <li className="footer-text">
                <Link to="/" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>

              {/* <li className="footer-text">
                <Link to="/aboutus" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  About Us
                </Link>
              </li> */}
              <li className="footer-text">
                <Link to="/contact" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </li>
              <li className="footer-text">
                <Link to="/privacypolicy" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-text">
                <Link to="/termsandcondition" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  Terms and Condition
                </Link>
              </li>
              <li className="footer-text">
                <Link to="/cancellationpage" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  Cancellation and Refund Policy
                </Link>
              </li>
              <li className="footer-text">
                <Link to="/faqpage" style={{ color: 'aliceblue', textDecoration: 'none' }}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3  col-6 col-6 mb-2 mb-md-0 pb-md-3">
            <ul className="list-unstyled normal-text">
              <li>
                <a href="https://wa.me/+919441180086">
                  <button className="footer-button">
                    <img src={WhatsApp} alt="" className="footer-button-icon" />
                    &nbsp; &nbsp;WhatsApp
                  </button>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/infila.in/">
                  <button className="footer-button">
                    <img src={Instagram} alt="" className="footer-button-icon" />
                    &nbsp; &nbsp;Instagram
                  </button>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=100088445471410">
                  <button className="footer-button">
                    <img src={Facebook} alt="" className="footer-button-icon" />
                    &nbsp; &nbsp;Facebook
                  </button>
                </a>
              </li>
              <li>
                <a href="">
                  <button className="footer-button">
                    <img src={LinkedIn} alt="" className="footer-button-icon" />
                    &nbsp; &nbsp;LinkedIn
                  </button>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/infilaindia">
                  <button className="footer-button">
                    <img src={Twitter} alt="" className="footer-button-icon" />
                    &nbsp; &nbsp;Twitter
                  </button>
                </a>
              </li>
              <li>
                <a href="https://in.pinterest.com/infilaindia/">
                  <button className="footer-button">
                    <img src={Pinterest} alt="" className="footer-button-icon" />
                    &nbsp; &nbsp;Pinterest
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3  col-6 mb-4 mb-md-0 pb-md-3 footer-text desktop-view">
            <div className="heading-text heading-fw mb-2">Our Mobile App</div>
            <p className="blinking-text m-0 p-0 heading-text" style={{ cursor: 'no-drop' }}>
              Coming Soon
            </p>
            <div>
              <img src={PlayStore} className="disabled" alt="" style={{ width: '6rem', marginTop: '1.2rem' }} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <img src={AppStore} className="disabled" alt="" style={{ width: '6rem', marginTop: '1.2rem' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center  p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'aliceblue', fontSize: '1rem' }}>
        © 2022 Copyright:Infila.in
        <a className="text-white" href="#"></a>
      </div>
    </footer>
  );
}

export default Footer;
