import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaBalanceScale, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import homepage from "../assets/home.png";
import maleImg from "../assets/male.jpg";
import femaleImg from "../assets/female.png";

function HomePage() {
  const headings = [
    "Welcome to Split It",
    "Manage Expenses Easily",
    "Track, Split & Settle",
    "Perfect for Groups & Trips",
  ];
  const [currentHeading, setCurrentHeading] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typeSpeed = 60;
    const delayBetweenWords = 2000;

    if (charIndex < headings[index].length) {
      const timeout = setTimeout(() => {
        setCurrentHeading((prev) => prev + headings[index].charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setCurrentHeading("");
        setIndex((prev) => (prev + 1) % headings.length);
      }, delayBetweenWords);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  const testimonials = [
    {
      name: "Ayesha K.",
      feedback:
        "Split It made our trip expenses so easy to manage and settle. Highly recommend! The UI is smooth and intuitive.",
      img: femaleImg,
      alt: "Female User",
    },
    {
      name: "Ravi M.",
      feedback:
        "Clear balances and flexible splitting helped me avoid awkward money talks. Best app for groups!",
      img: maleImg,
      alt: "Male User",
    },
    {
      name: "Sana P.",
      feedback:
        "Perfect for roommates! No more confusion about who owes what. Simple and effective.",
      img: femaleImg,
      alt: "Female User",
    },
    {
      name: "Arjun S.",
      feedback:
        "Using Split It during our group trips saved us so much hassle. Easy to use and reliable.",
      img: maleImg,
      alt: "Male User",
    },
    {
      name: "Fatima L.",
      feedback:
        "I love how easy it is to add expenses and split with friends. Highly recommend for any group activity.",
      img: femaleImg,
      alt: "Female User",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (idx) => {
    setCurrentTestimonial(idx);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-teal-50 via-white to-teal-100 ">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-4 py-16 md:py-24 gap-12 max-w-7xl mx-auto">
        <div className="md:w-1/2 w-full">
          <img
            src={homepage}
            alt="Split It Hero"
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 font-serif mb-6">
            {currentHeading}
            <span className="blinking-cursor">|</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-600 font-serif mb-6 mt-10">
            Simplifying expense management for friends, families, and groups.
          </p>
          <div className="flex gap-6 justify-center md:justify-start">
            <Link to="/register">
              <button className="bg-teal-700 text-white px-6 py-2 rounded-full hover:text-teal-900  hover:bg-teal-100 transition duration-300">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="border border-teal-700 text-teal-700 px-6 py-2 rounded-full hover:bg-teal-900  hover:text-white transition duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-tr from-teal-100 via-cyan-50 to-teal-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-teal-700 font-serif mb-6 drop-shadow-md">
            Why Use Split It?
          </h2>
          <p className="text-lg md:text-xl text-emerald-500 font-serif mb-16 max-w-3xl mx-auto">
            Effortlessly share and manage expenses for trips, meals, roommates, and more. Simple, clear, and fair for everyone.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Track Every Expense",
                icon: <FaMoneyBillWave className="text-teal-600 text-6xl mb-6" />,
                desc: "Keep all your shared expenses organized in one place with clear records.",
              },
              {
                title: "Flexible Splitting",
                icon: <FaBalanceScale className="text-teal-600 text-6xl mb-6" />,
                desc: "Split costs equally or adjust shares to fit any group or situation.",
              },
              {
                title: "Clear Balances",
                icon: <FaUsers className="text-teal-600 text-6xl mb-6" />,
                desc: "Instantly see who owes what, so settling up is quick and easy.",
              },
            ].map(({ title, icon, desc }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-teal-100">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-teal-900 mb-3 font-serif">
                  {title}
                </h3>
                <p className="text-teal-700 text-base leading-relaxed font-serif">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-cyan-100 to-teal-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-teal-800 font-serif mb-12">
            What Our Users Say
          </h2>
          <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
            <img
              src={testimonials[currentTestimonial].img}
              alt={testimonials[currentTestimonial].alt}
              className="w-28 h-28 rounded-full object-cover shadow-lg mb-6"
            />
            <p className="text-gray-900 text-2xl md:text-xl font-serif mb-8 italic max-w-4xl mx-auto px-6 leading-relaxed">
              "{testimonials[currentTestimonial].feedback}"
            </p>
            <h3 className="text-teal-800 text-2xl font-semibold font-serif">
              - {testimonials[currentTestimonial].name}
            </h3>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToTestimonial(idx)}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  idx === currentTestimonial
                    ? "bg-teal-700"
                    : "bg-teal-300 hover:bg-teal-500"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blinking Cursor Style */}
      <style>{`
        .blinking-cursor {
          animation: blink 1s step-start 0s infinite;
          color: teal;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
