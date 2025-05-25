import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authImage from "../assets/auth.png";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed", { position: "top-center" });
        return;
      }

      localStorage.setItem("token", data.token);

      toast.success("Login successful! 🎉", { position: "top-center" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };

 const handleForgotPassword = async () => {
  if (!email) {
    toast.error("Please enter your email to reset password!", { position: "top-center" });
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Failed to send reset link", { position: "top-center" });
      return;
    }

    toast.success("Password reset link sent! 📧", { position: "top-center" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    toast.error("Something went wrong. Please try again.", { position: "top-center" });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
        
        <div className="md:w-1/2 hidden md:block bg-gray-100">
          <img src={authImage} alt="Auth" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-6 font-serif">Login to Split-It</h2>

          <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await fetch("http://localhost:5000/api/auth/google", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken: credentialResponse.credential }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    toast.error(data.message || "Google Sign-In failed", { position: "top-center" });
                    return;
                  }

                  localStorage.setItem("token", data.token);
                  toast.success("Google Sign-In successful! 🎉", { position: "top-center" });
                  setTimeout(() => navigate("/dashboard"), 2000);
                } catch (err) {
                  console.error("Google Sign-In Error:", err);
                  toast.error("Something went wrong. Try again later.", { position: "top-center" });
                }
              }}
              onError={() => {
                toast.error("Google Sign-In was cancelled or failed.", { position: "top-center" });
              }}
            />
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="flex justify-end mt-3">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
