import React from "react";
import { FaMoneyBillWave, FaBalanceScale, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import homepage from "../assets/home.jpeg";

function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-800">
      
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homepage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-purple-900/70 z-10" />
        <div className="relative z-20 flex items-center justify-center h-full px-4 md:px-12 text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white font-mono mb-4 drop-shadow-lg animate-fade-in-down">
              Welcome to Split It
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-serif animate-fade-in-up">
              Simplifying expense management for friends, families, and groups.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-100">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-900 font-serif mb-12">
          Why Choose Split It?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature Card */}
          {[
            {
              title: "Track Expenses",
              icon: <FaMoneyBillWave className="text-purple-600 text-4xl mb-4" />,
              desc: "Keep a detailed record of every shared expense seamlessly.",
            },
            {
              title: "Split Equally or Unequally",
              icon: <FaBalanceScale className="text-purple-600 text-4xl mb-4" />,
              desc: "Handle different expense splits effortlessly for any scenario.",
            },
            {
              title: "Transparent Balances",
              icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
              desc: "View clear and up-to-date balances with all participants.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold font-mono mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-base font-serif">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800 font-mono mb-4">
          Start Splitting Today
        </h2>
        <p className="text-lg md:text-xl font-serif text-gray-700 max-w-2xl mx-auto mb-8">
          Join thousands of users who manage expenses seamlessly with Split It.
        </p>
        <Link to="/register">
          <button className="bg-purple-700 text-white px-8 py-3 font-semibold rounded-full hover:bg-purple-800 transition duration-300">
            Get Started Now
          </button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
