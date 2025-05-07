
import React from 'react';
import './Home.css';

function HomePage() {
  const sliderImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg'
  ];

  return (
    <div className="home">
      <div className="slider">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      <div className="overlay">
        <h1>Welcome to AgriBridge</h1>
        <p>
          Empowering Farmers with Technology. Access market prices, sell products directly, and explore modern agriculture tools.
        </p>
        <div className="btns">
          <a href="/login" className="btn">Login</a>
          <a href="/signup" className="btn">Signup</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
