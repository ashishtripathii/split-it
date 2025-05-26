import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Info, Phone, MessageSquare } from "lucide-react";
import { FaHome } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Brand & Tagline */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold font-serif">SPLIT-IT</h2>
            <p className="text-sm text-gray-300">Split bills easily with friends and family.</p>
          </div>

          {/* Navigation Links */}
           <div className="hidden md:flex flex-col font-mono font-bold space-y-3">
  <h2 className="text-lg underline mb-2">Quick Links</h2>
  <Link to="/" className="hover:text-blue-400">Home</Link>
  <Link to="/about" className="hover:text-blue-400">About</Link>
  <Link to="/contact" className="hover:text-blue-400">Contact</Link>
  <Link to="/feedback" className="hover:text-blue-400">Feedback</Link>
  <Link to="/register" className="hover:text-blue-400">Sign Up</Link>
  <Link to="/login" className="hover:text-blue-400">Log In</Link>
  <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
  <Link to="/profile" className="hover:text-blue-400">Profile</Link>
</div>

          {/* Social Links */}
          <div className="flex space-x-5 text-3xl text-gray-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SPLIT-IT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
