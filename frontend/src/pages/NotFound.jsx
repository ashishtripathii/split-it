import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function NotFound() {
    
      

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-teal-200 to-blue-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-slate-600 drop-shadow-md">404</h1>
        <p className="mt-4 text-3xl font-semibold text-teal-800">Oops! Page Not Found</p>
        <p className="mt-2 text-lg text-blue-100">
          Sorry, the page you are looking for doesn’t exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-2xl shadow hover:bg-blue-100 hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
