import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/user", { withCredentials: true });
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    const words = nameOrEmail.trim().split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0];
    } else if (nameOrEmail.includes("@")) {
      return nameOrEmail[0].toUpperCase();
    } else {
      return words[0][0].toUpperCase();
    }
  };

  return (
    <div className="flex h-screen bg-zinc-500 text-gray-800 font-mono">
      <aside className="w-64 bg-slate-600 p-5 space-y-4 text-black">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/create-group" className="block p-2 hover:bg-gray-200 rounded">Create Group</Link>
          <Link to="/join-group" className="block p-2 hover:bg-gray-200 rounded">Join Group</Link>
          <Link to="/expense-history" className="block p-2 hover:bg-gray-200 rounded">Expense History</Link>
          <Link to="/notifications" className="block p-2 hover:bg-gray-200 rounded">New Notifications</Link>
          <Link to="/settle-up" className="block p-2 hover:bg-gray-200 rounded">Settle Up</Link>
          <Link to="/profile" className="block p-2 hover:bg-gray-200 rounded">Profile Management</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>

        {loading ? (
          <p className="text-lg">Fetching user details...</p>
        ) : userData ? (
          <>
            {userData.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full mb-4 border-4 border-gray-300 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-400 text-white text-3xl font-bold mb-4 border-4 border-gray-300 shadow-lg">
                {getInitials(userData.fullName || userData.email)}
              </div>
            )}
            <p className="text-lg">Name: <span className="font-bold">{userData.fullName || "N/A"}</span></p>
            <p className="text-lg">Email: <span className="font-bold">{userData.email}</span></p>
          </>
        ) : (
          <p className="text-lg text-red-600">User not found! Please log in again.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
