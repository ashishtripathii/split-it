import React, { useState } from "react";
import { Menu, X, User, UserPlus, MessageSquare, Phone, Info } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-teal-800 text-white shadow-md sticky top-0 z-50">
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
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-20 w-20 object-cover" />
            <span className="text-2xl font-bold animate-pulse font-serif">
              SPLIT-IT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 font-mono font-bold">
            <Link to="/" className="hover:text-blue-400 flex items-center">
              <FaHome className="mr-2" /> Home
            </Link>
            <Link to="/about" className="hover:text-blue-400 flex items-center">
              <Info className="mr-2" /> About
            </Link>
            <Link to="/contact" className="hover:text-blue-400 flex items-center">
              <Phone className="mr-2" /> Contact
            </Link>
            <Link to="/feedback" className="hover:text-blue-400 flex items-center">
              <MessageSquare className="mr-2" /> Feedback
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
            <Link to="/" className="flex items-center py-2 px-4 hover:bg-gray-800">
              <FaHome className="mr-2" /> Home
            </Link>
            <Link to="/about" className="flex items-center py-2 px-4 hover:bg-gray-800">
              <Info className="mr-2" /> About
            </Link>
            <Link to="/contact" className="flex items-center py-2 px-4 hover:bg-gray-800">
              <Phone className="mr-2" /> Contact
            </Link>
            <Link to="/feedback" className="flex items-center py-2 px-4 hover:bg-gray-800">
              <MessageSquare className="mr-2" /> Feedback
            </Link>
            
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
