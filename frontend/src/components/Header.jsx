import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      {/* Toast Notifications */}
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Slide}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            {/* Replace with your actual logo import */}
            <img src={logo} alt="Logo" className="h-20 w-20 object-cover" />
            <span className="text-2xl font-bold animate-pulse font-serif">
              SPLIT-IT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 font-mono font-bold">
            <Link
              to="/"
              className="hover:text-blue-400 flex items-center transition-all duration-300"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-400 flex items-center transition-all"
            >
              <User className="mr-2" /> Register
            </Link>
            <Link
              to="/login"
              className="hover:text-blue-400 flex items-center transition-all"
            >
              <User className="mr-2" /> Log In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col bg-gray-900 text-white rounded-md p-4 space-y-2">
            <Link
              to="/"
              className="flex items-center py-2 px-4 hover:bg-gray-800 transition-all"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/register"
              className="flex items-center py-2 px-4 hover:bg-gray-800 transition-all"
            >
              <User className="mr-2" /> Register
            </Link>
            <Link
              to="/login"
              className="flex items-center py-2 px-4 hover:bg-gray-800 transition-all"
            >
              <User className="mr-2" /> Log In
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
