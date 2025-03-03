import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../assets/Screenshot-2025-02-22-223336.svg';
import { useAuth } from '../Pages/AuthContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profileData } = useAuth();  
  const [totalcarts, settotalcart] = useState("");
  const dropdownRef = useRef(null); 
  const mobileMenuRef = useRef(null); 
  const menuButtonRef = useRef(null); 

  const [profileImage, setProfileImage] = useState(profileData?.image);
  const navigate = useNavigate();
  
  useEffect(() => {
    setProfileImage(profileData?.image);
  }, [profileData]);



  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedIn");
    navigate('/login');
  };

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const totalcart = cartData ? JSON.parse(cartData).length : 0;
    settotalcart(totalcart);
  }, []);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("touchstart", handleClickOutsideMenu);
      document.addEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("touchstart", handleClickOutsideMenu);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-dark-green sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src={img1} width={120} className="bg-white p-1 rounded" alt="Khapinoz Pizza Logo" />
            </Link>

            <button
              ref={menuButtonRef} 
              className="sm:hidden text-white ml-4 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link to="/" className="rounded-md bg-dark-green px-3 py-2 text-sm font-medium text-white hover:bg-light-green">
              Home
            </Link>
            <Link to="/menu" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-light-green">
              Menu
            </Link>
            <Link to="/offers" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-light-green">
              Offers
            </Link>
            <Link to="/locations" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-light-green">
              Locations
            </Link>
          </div>

  
          <div className="flex items-center space-x-4">
            <Link to="/addtocart" className="text-white hover:text-gray-200 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalcarts || 0}
              </span>
            </Link>

            <Link to="/order" className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-yellow-500 hidden sm:block">
              Order Now
            </Link>

            
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  className="size-8 rounded-full"
                  src={profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                  alt="Profile"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div
          ref={mobileMenuRef} 
          className={`sm:hidden bg-dark-green px-2 pt-2 pb-3 space-y-1 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } absolute top-16 left-0 w-full z-40`}
        >
          <Link
            to="/"
            className="block rounded-md bg-mid-green px-3 py-2 text-sm font-medium text-white hover:bg-light-green"
            onClick={() => setIsMobileMenuOpen(false)} 
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/offers"
            className="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Offers
          </Link>
          <Link
            to="/locations"
            className="block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Locations
          </Link>
          <Link
            to="/order"
            className="block rounded-md bg-yellow-400 px-3 py-2 text-sm font-medium text-black hover:bg-yellow-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Order Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



