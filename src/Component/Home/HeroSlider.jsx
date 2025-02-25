import React from 'react';
import { Link } from 'react-router-dom';
import heroSliderImg from '../../assets/heroSliderHome.avif'
const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center sm:text-left"
      style={{
        backgroundImage:`url(${heroSliderImg})`, 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Fresh Pizzas, Delivered Fast!
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Order from Khapinoz Pizza and satisfy your cravings today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/order"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
          >
            Order Now
          </Link>
          <Link
            to="/menu"
            className="border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-red-600 transition"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;