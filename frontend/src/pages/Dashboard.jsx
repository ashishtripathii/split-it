import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardAside from "../components/DashBoardAside";
import API from "../utils/axios"; // Adjust the import path as necessary
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [groupDetails, setGroupDetails] = useState({});

   useEffect(() => {
    const fetchUserAndGroups = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const resUser = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(resUser.data.user);

        const resGroups = await API.get("/groups/joined", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(resGroups.data.groups || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndGroups();
  }, []);

  const handleToggleGroup = async (groupId) => {
    if (expandedGroupId === groupId) {
      setExpandedGroupId(null); // Collapse
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/groups/details/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGroupDetails((prev) => ({
        ...prev,
        [groupId]: res.data.group,
      }));
      setExpandedGroupId(groupId);
    } catch (err) {
      console.error("Error fetching group details:", err);
    }
  };
   const getInitials = (nameOrEmail) => {
    if (!nameOrEmail) return "U";
    const words = nameOrEmail.trim().split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : nameOrEmail[0].toUpperCase();
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 to-teal-50 font-mono">
      <DashBoardAside />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-6 drop-shadow">
            Welcome to Dashboard
          </h1>
          {loading ? (
            <p className="text-center text-lg text-black">Loading...</p>
          ) : userData ? (
            <div className="text-center mb-6">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full border-4 border-teal-300 shadow-lg mb-4"
                />
              ) : (
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center bg-teal-500 text-white text-3xl font-bold mb-4 border-4 border-teal-300 shadow-lg">
                  {getInitials(userData.fullName || userData.email)}
                </div>
              )}
              <p className="text-lg text-black">
                Name: <span className="font-bold">{userData.fullName || "N/A"}</span>
              </p>
              <p className="text-lg text-black">
                Email: <span className="font-bold">{userData.email}</span>
              </p>
            </div>
          ) : (
            <p className="text-lg text-center text-black">User not found! Please log in again.</p>
          )}

          {/* Joined Groups Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center">
              Your Joined Groups
            </h2>
            {groups.length === 0 ? (
              <p className="text-center text-gray-600">You have not joined any groups yet.</p>
            ) : (
              <ul className="space-y-4">
                {groups.map((group) => (
                  <li key={group._id} className="rounded-xl shadow transition">
                    <div
                      className={`flex justify-between items-center px-4 py-3 bg-gradient-to-r from-teal-100 to-cyan-200 rounded-xl cursor-pointer hover:scale-[1.01] hover:shadow-lg transition`}
                      onClick={() => handleToggleGroup(group._id)}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-slate-600 select-none">
                        {group.name}
                      </h3>
                      <span className="text-white font-bold text-lg">
                        {expandedGroupId === group._id ? "▲" : "▼"}
                      </span>
                    </div>

                    {/* Animated expand/collapse */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedGroupId === group._id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {expandedGroupId === group._id && groupDetails[group._id] && (
                        <div className="bg-white p-6 rounded-b-xl shadow-inner border-t border-teal-100">
                          <p className="text-gray-700 mb-4">
                            <span className="font-semibold text-teal-700">Description:</span>{" "}
                            {groupDetails[group._id].description || "No description"}
                          </p>
                          <h4 className="font-semibold text-teal-700 mb-2">Members:</h4>
                          {groupDetails[group._id].members.length === 0 ? (
                            <p className="text-gray-500">No members yet.</p>
                          ) : (
                            <ul className="space-y-2">
                              {groupDetails[group._id].members.map((member) => (
                                <li
                                  key={member._id}
                                  className="flex justify-between items-center border-b pb-1"
                                >
                                  <span className="text-gray-800">{member.fullName} ({member.email})</span>
                                  <span className="text-sm text-teal-700 font-semibold">
                                    {member.status}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;