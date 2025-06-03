import React, { useState } from "react";
import API from "../utils/axios"; // Adjust path as needed
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import img from "../assets/contact.avif";
import { toast } from "react-toastify"; // Import toast for notifications
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    loading: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, loading: true, error: null });

    try {
      const response = await API.post("/general/contact", formData);
      setStatus({ submitted: true, loading: false, error: null });
      setFormData({ name: "", email: "", message: "" });
      toast.success("Your message has been sent!"); // <-- Success toast
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to send message";
      setStatus({ submitted: false, loading: false, error: message });
      toast.error(message); // <-- Error toast
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-teal-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={img}
            alt="Contact Us"
            className="h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-teal-900 mb-6 text-center md:text-left font-serif">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 mb-10">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
              Ask any Query or Just drop a message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className={`w-full bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition font-semibold shadow ${
                status.loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {status.submitted && (
              <p className="mt-4 text-green-600 font-semibold text-center">
                Thank you! Your message has been sent.
              </p>
            )}

            {status.error && (
              <p className="mt-4 text-red-600 font-semibold text-center">
                {status.error}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-10 p-8">
        <h3 className="text-2xl font-semibold text-teal-800 mb-6 text-center font-serif">
          Contact Us Here
        </h3>
        <div className="flex flex-col md:flex-row justify-around text-gray-700 space-y-5 md:space-y-0">
          <div className="flex items-center space-x-3">
            <MdEmail className="text-teal-600 text-3xl" />
            <a href="mailto:support@spliteit.com" className="underline text-teal-600 text-lg">
              support@spliteit.com
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <MdPhone className="text-teal-600 text-3xl" />
            <span className="text-lg">+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-3">
            <MdLocationOn className="text-teal-600 text-3xl" />
            <span className="text-lg">123 Tech Park, Bhopal, India</span>
          </div>
          <div className="flex items-center space-x-3">
            <MdAccessTime className="text-teal-600 text-3xl" />
            <span className="text-lg">Mon - Fri, 9 AM to 6 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
