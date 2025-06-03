import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardAside from "../components/DashBoardAside";
import { toast } from "react-toastify";
import API from "../utils/axios.js"// <-- import your axios instance

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        navigate("/login");
        return;
      }
      try {
        const { data } = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const admin = {
          name: data.user.fullName || data.user.name || "Me",
          email: data.user.email,
          isAdmin: true,
        };
        setGroupMembers([admin]);
      } catch (err) {
        console.error("Profile fetch failed:", err.response?.data || err);
        toast.error("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [navigate]);

  const handleMemberChange = (i, field, val) => {
    setGroupMembers((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m))
    );
  };

  const addMember = () =>
    setGroupMembers([...groupMembers, { name: "", email: "", isAdmin: false }]);

  const deleteMember = (i) =>
    i !== 0 && setGroupMembers(groupMembers.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName || groupMembers.some((m) => !m.name || !m.email)) {
      toast.warn("Please fill in the group name and all members' name & email.");
      return;
    }
    try {
      await API.post(
        "/groups/create",
        { name: groupName, members: groupMembers },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Group created & invites sent!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Group creation failed:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to create group");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-cyan-100 to-teal-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 to-teal-50 font-mono">
      <DashBoardAside />
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-teal-900 text-center mb-6 font-serif">
            Create a New Group
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Group Name
              </label>
              <input
                className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:text-gray-400"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-teal-500">Members</h3>
              <div className="space-y-3">
                {groupMembers.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row items-center gap-2 bg-teal-50 p-3 rounded-lg border border-teal-200"
                  >
                    <input
                      disabled={m.isAdmin}
                      value={m.name}
                      onChange={(e) =>
                        handleMemberChange(i, "name", e.target.value)
                      }
                      placeholder="Name"
                      className={`border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 ${
                        m.isAdmin
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-800 focus:ring-teal-400"
                      }`}
                      required
                    />
                    <input
                      disabled={m.isAdmin}
                      value={m.email}
                      onChange={(e) =>
                        handleMemberChange(i, "email", e.target.value)
                      }
                      placeholder="Email"
                      className={`border p-2 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 ${
                        m.isAdmin
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-800 focus:ring-teal-400"
                      }`}
                      required
                    />
                    {m.isAdmin ? (
                      <span className="text-xs font-semibold text-green-600 ml-2">
                        (Admin)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => deleteMember(i)}
                        className="ml-2 text-red-500 text-lg hover:bg-red-100 rounded-full w-8 h-8 flex items-center justify-center transition"
                        title="Remove member"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMember}
                className="mt-4 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow"
              >
                + Add Member
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-teal-600 transition"
            >
              Create Group &amp; Send Invites
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;
