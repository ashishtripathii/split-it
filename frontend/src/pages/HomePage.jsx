import React from 'react';
import { FaMoneyBillWave, FaBalanceScale, FaUsers } from 'react-icons/fa';  // Importing icons
import homepage from '../assets/home.jpeg'; // Importing an image

import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Hero Section with Cover Image */}
     
      <div
  className="relative h-[600px] w-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${homepage})`,
  }}
>
  {/* Black overlay */}
  <div className="absolute inset-0  bg-opacity-60 z-10" />

  {/* Text content centered over image */}
  <div className="relative z-20 h-full w-full flex items-center justify-center">
    <div className="text-center px-4 md:px-12">
      <h1 className="text-orange-300 text-5xl md:text-6xl font-extrabold drop-shadow-lg font-mono animate-bounce">
        Welcome to Split It
      </h1>
      <p className="text-slate-900 text-2xl md:text-xl mt-4 max-w-2xl mx-auto font-serif">
  <span className="fade-in mr-2">Simplifying</span>
  <span className="fade-in mr-2">expense</span>
  <span className="fade-in mr-2">management</span>
  <span className="fade-in mr-2">for</span>
  <span className="fade-in mr-2">friends,</span>
  <span className="fade-in mr-2">families,</span>
  <span className="fade-in mr-2">and</span>
  <span className="fade-in">groups.</span>
</p>

    </div>
  </div>
</div>


      {/* Features Section */}
      <section className="p-8 md:p-16 text-center bg-gradient-to-r from-gray-500 via-yellow-500 to-slate-400">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6 font-serif">
          Why Choose Split Money?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Track Expenses Card */}
          <div className="bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          
            <h3 className="text-2xl font-semibold mb-4 text-black font-mono">
              <FaMoneyBillWave className="inline-block mr-2" />
              Track Expenses
            </h3>
            <p className="text-gray-800 text-lg">
              Keep a detailed record of every shared expense seamlessly.
            </p>
          </div>

          {/* Split Equally or Unequally Card */}
          <div className="bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
         
            <h3 className="text-2xl font-semibold mb-4 text-black font-mono">
              <FaBalanceScale className="inline-block mr-2" />
              Split Equally or Unequally
            </h3>
            <p className="text-gray-800 text-lg">
              Handle different expense splits effortlessly for any scenario.
            </p>
          </div>

          {/* Transparent Balances Card */}
          <div className="bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
   
            <h3 className="text-2xl font-semibold mb-4 text-black font-mono">
              <FaUsers className="inline-block mr-2" />
              Transparent Balances
            </h3>
            <p className="text-gray-800 text-lg">
              View clear and up-to-date balances with all participants.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-slate-400 text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Start Splitting Today</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-serif">
          Join thousands of users who manage expenses seamlessly with Split Money.
        </p>
        <Link to="/register">
        <button className="bg-white text-blue-950 px-8 py-3 font-medium rounded-full hover:bg-gray-100 transition">
          Get Started Now
        </button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
