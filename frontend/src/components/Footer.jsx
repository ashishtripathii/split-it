import React from "react";
import { FaTwitter, FaLinkedin, FaYoutube, FaFileAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0033A0] to-[#0055D4] text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-2xl">
            💰
          </div>
          <h2 className="text-3xl font-semibold tracking-wide">Splite-It</h2>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 mt-6 text-sm opacity-90">
          <li><a href="#" className="hover:text-gray-300 transition">Terms of Service</a></li>
          <li><a href="#" className="hover:text-gray-300 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-gray-300 transition">Help Center</a></li>
          <li><a href="#" className="hover:text-gray-300 transition">Contact Us</a></li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex gap-5 mt-6">
          <FaTwitter className="text-xl hover:text-gray-300 transition cursor-pointer" />
          <FaLinkedin className="text-xl hover:text-gray-300 transition cursor-pointer" />
          <FaYoutube className="text-xl hover:text-gray-300 transition cursor-pointer" />
          <FaFileAlt className="text-xl hover:text-gray-300 transition cursor-pointer" />
        </div>

        {/* Copyright */}
        <p className="text-xs mt-6 opacity-80 font-sans">
          &copy; {new Date().getFullYear()} Splite-It. All rights reserved.
        </p>

       
      </div>
    </footer>
  );
}

export default Footer;


