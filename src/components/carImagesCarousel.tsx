import React, { Component } from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './carousel.css';
import car1 from '../assets/Car.png';
import car2 from '../assets/TataN1.jpg';
import car3 from '../assets/TataN2.jpg';

class CarImagesCard extends Component {
  render() {
    return (
      <Carousel className="d-flex flex">
        <div className="d-flex flex-column">
          <img src={car1} />
        </div>
        <div>
          <img src={car2} />
        </div>
        <div>
          <img src={car3} />
        </div>
      </Carousel>
    );
  }
}

export default CarImagesCard;
