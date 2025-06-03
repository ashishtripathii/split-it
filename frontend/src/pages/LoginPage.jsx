import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authImage from "../assets/auth.png";
import { GoogleLogin } from "@react-oauth/google";
import API from '../utils/axios.js'; // Adjust the import path as necessary
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("All fields are required!");
    return;
  }

  try {
    const response = await API.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);

    toast.success("Login successful! 🎉");
    setTimeout(() => navigate("/dashboard"), 2000);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(message);
    console.error("Login error:", error);
  }
};

const handleForgotPassword = async () => {
  if (!email) {
    toast.error("Please enter your email to reset password!");
    return;
  }

  try {
    const response = await API.post("/auth/forgot-password", { email });
    toast.success("Password reset link sent! 📧");
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to send reset link";
    toast.error(message);
    console.error("Forgot Password Error:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-100 p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex flex-col md:flex-row max-w-5xl w-full shadow-2xl rounded-2xl overflow-hidden bg-white">
        <div className="w-full md:w-1/2 p-6 bg-teal-200 hidden md:flex">
          <img src={authImage} alt="Decorative Illustration" className="w-full h-auto object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-teal-900 text-center mb-6 font-serif">
            Login to Split-It
          </h2>
                   <div className="flex items-center mb-6">
  <hr className="flex-grow border-t border-black" />
  <span className="mx-3 text-teal-500 font-semibold">OR</span>
  <hr className="flex-grow border-t border-black" />
</div>
          <div className="mb-4 flex justify-center">
  <div className="w-full max-w-xs">
   <GoogleLogin
  width="300"               // wider button
  size="large"              // larger size
  theme="outline"           // light style, no solid fill
  shape="rectangular"       // rectangular shape (no circle)
  onSuccess={async (credentialResponse) => {
    try {
      const res = await API.post(
        "/auth/google",
        { idToken: credentialResponse.credential }
      );

      const data = res.data;

      if (!res.status || res.status !== 200) {
        toast.error(data.message || "Google Sign-In failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Google Sign-In successful! 🎉");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      toast.error("Something went wrong. Try again later.");
    }
  }}
  onError={() => {
    toast.error("Google Sign-In was cancelled or failed.");
  }}
/>
  </div>
</div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-teal-400 rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border border-teal-400 rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-teal-600"
              >
                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 px-4 rounded-lg hover:bg-teal-800 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="flex justify-end mt-3">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-teal-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <p className="text-center text-teal-900 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
