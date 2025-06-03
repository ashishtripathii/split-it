import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaBalanceScale, FaUsers, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import homepage from "../assets/home.png";
import API from "../utils/axios"; // <-- Import your axios instance
import user from "../assets/male.jpg"; // Placeholder for user avatar
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

  // Fetch feedbacks from backend
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await API.get("/general/all-feedback");
        setFeedbacks(res.data);
      } catch (err) {
        setFeedbacks([]);
      }
    };
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks]);

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

<section className="py-20 px-6 bg-gradient-to-b from-cyan-100 to-teal-50">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-teal-800 font-serif mb-12">
      What Our Users Say
    </h2>
    {feedbacks.length > 0 ? (
      <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 w-full">
          {/* Left Arrow */}
          <button
            onClick={() =>
              setCurrentTestimonial(
                (currentTestimonial - 1 + feedbacks.length) % feedbacks.length
              )
            }
            className="p-2 rounded-full bg-teal-50 hover:bg-teal-200 text-teal-700 text-2xl transition"
            aria-label="Previous"
          >
            &#8592;
          </button>
          {/* Feedback Content */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <img
              src={user}
              alt="User"
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 shadow"
            />
            <p className="text-gray-900 text-2xl md:text-xl font-serif mb-4 italic max-w-3xl mx-auto px-6 leading-relaxed ">
              "{feedbacks[currentTestimonial].feedback}"
            </p>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < (feedbacks[currentTestimonial].rating || 0)
                      ? "text-teal-400"
                      : "text-gray-300"
                  }
                  size={24}
                />
              ))}
            </div>
            <h3 className="text-teal-800 text-2xl font-semibold font-serif">
              - {feedbacks[currentTestimonial].name || "Anonymous"}
            </h3>
          </div>
          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrentTestimonial(
                (currentTestimonial + 1) % feedbacks.length
              )
            }
            className="p-2 rounded-full bg-teal-50 hover:bg-teal-200 text-teal-700 text-2xl transition"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {feedbacks.map((_, idx) => (
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
    ) : (
      <div className="text-gray-500 text-lg">No feedback yet.</div>
    )}
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