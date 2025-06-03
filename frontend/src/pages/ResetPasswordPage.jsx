import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashBoardAside from "../components/DashBoardAside";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../utils/axios"; // Adjust the import path as necessary
export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

const handleReset = async (e) => {
  e.preventDefault();

  if (!password || !confirm) {
    toast.error("All fields are required", { position: "top-center" });
    return;
  }

  if (password !== confirm) {
    toast.error("Passwords do not match", { position: "top-center" });
    return;
  }

  if (!token) {
    toast.error("Invalid or missing token", { position: "top-center" });
    return;
  }

  try {
    const { data } = await API.post(`/auth/reset-password/${token}`, { password });

    toast.success("Password reset successful!", { position: "top-center" });
    setTimeout(() => navigate("/login"), 2000);
  } catch (err) {
    console.error("Reset Error:", err);
    const message =
      err.response?.data?.message || "Something went wrong. Try again later.";
    toast.error(message, { position: "top-center" });
  }
};


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 to-teal-50 font-mono">
      <DashBoardAside />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-6 drop-shadow">
            Reset Your Password
          </h2>
          <form onSubmit={handleReset} className="space-y-5">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-teal-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-500 hover:text-teal-600"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition duration-150 shadow"
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
