import React from 'react'
import {Link} from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
 const DashBoardAside = () => {
  const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <aside className="w-64 bg-white/80 backdrop-blur p-5 space-y-4 text-teal-900 shadow-lg">
      <Link to='/dashboard' className="text-2xl font-bold mb-4">Dashboard</Link>
      <nav className="space-y-2">
        <Link to="/create-group" className="block p-2 hover:bg-teal-100 rounded">Create Group</Link>
        <Link to="/join-group" className="block p-2 hover:bg-teal-100 rounded">Join Group</Link>
        <Link to="/expense-history" className="block p-2 hover:bg-teal-100 rounded">Expense History</Link>
        <Link to="/notifications" className="block p-2 hover:bg-teal-100 rounded">New Notifications</Link>
        <Link to="/settle-up" className="block p-2 hover:bg-teal-100 rounded">Settle Up</Link>
        <Link to="/profile" className="block p-2 hover:bg-teal-100 rounded">Profile Management</Link>
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 hover:bg-teal-100 rounded cursor-pointer text-left"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </div>
      </nav>
    </aside>
    </>
  )
}

export default DashBoardAside
