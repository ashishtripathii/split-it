import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut } from "react-icons/fi"; // at the top


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
  // ...existing code...

  <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 to-teal-50  font-mono">
    <aside className="w-64 bg-white/80 backdrop-blur p-5 space-y-4 text-teal-900 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <nav className="space-y-2">
        <Link to="/create-group" className="block p-2 hover:bg-teal-100 rounded">Create Group</Link>
        <Link to="/join-group" className="block p-2 hover:bg-teal-100 rounded">Join Group</Link>
        <Link to="/expense-history" className="block p-2 hover:bg-teal-100 rounded">Expense History</Link>
        <Link to="/notifications" className="block p-2 hover:bg-teal-100 rounded">New Notifications</Link>
        <Link to="/settle-up" className="block p-2 hover:bg-teal-100 rounded">Settle Up</Link>
        <Link to="/profile" className="block p-2 hover:bg-cyan-300 rounded">Profile Management</Link>
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 hover:bg-teal-100 rounded cursor-pointer text-left"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </div>
      </nav>
    </aside>

    <main className="flex-1 p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-black drop-shadow">Welcome</h1>
      {loading ? (
        <p className="text-lg text-black">Fetching user details...</p>
      ) : userData ? (
        <>
          {userData.profileImage ? (
            <img 
              src={userData.profileImage} 
              alt="Profile" 
              className="w-24 h-24 rounded-full mb-4 border-4 border-teal-200 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-teal-500 text-black text-3xl font-bold mb-4 border-4 border-teal-200 shadow-lg">
              {getInitials(userData.fullName || userData.email)}
            </div>
          )}
          <p className="text-lg text-black">Name: <span className="font-bold">{userData.fullName || "N/A"}</span></p>
          <p className="text-lg text-black">Email: <span className="font-bold">{userData.email}</span></p>
        </>
      ) : (
        <p className="text-lg text-black">User not found! Please log in again.</p>
      )}
    </main>
  </div>
);
// ...existing code...
  
};

export default Dashboard;
