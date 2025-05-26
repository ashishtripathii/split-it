import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");

      // ───── no token? send them to login and stop loading ─────
      if (!token) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const admin = {
          name: data.user.fullName || data.user.name || "Me",
          email: data.user.email,
          isAdmin: true,
        };

        setGroupMembers([admin]);
      } catch (err) {
        console.error("Profile fetch failed:", err.response?.data || err);
      } finally {
        setLoading(false);       // ✅ ALWAYS clear the spinner
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  /* ---------- handlers ---------- */

  const handleMemberChange = (i, field, val) => {
    setGroupMembers((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m))
    );
  };

  const addMember = () =>
    setGroupMembers([...groupMembers, { name: "", email: "", isAdmin: false }]);

  const deleteMember = (i) =>
    i !== 0 && setGroupMembers(groupMembers.filter((_, idx) => idx !== i)); // keep admin

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName || groupMembers.some((m) => !m.name || !m.email)) {
      alert("Fill in group name and every member’s name & email.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/groups/create",
        { name: groupName, members: groupMembers },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Group created & invites sent!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Create error:", err.response?.data || err);
      alert("Couldn’t create the group.");
    }
  };

  /* ---------- render ---------- */

  if (loading) return <p className="text-center mt-10">Loading…</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Group</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        <h3 className="font-semibold text-lg">Members</h3>

        {groupMembers.map((m, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              disabled={m.isAdmin}
              value={m.name}
              onChange={(e) => handleMemberChange(i, "name", e.target.value)}
              placeholder="Name"
              className={`border p-2 rounded w-1/3 ${
                m.isAdmin && "bg-gray-100"
              }`}
              required
            />
            <input
              disabled={m.isAdmin}
              value={m.email}
              onChange={(e) => handleMemberChange(i, "email", e.target.value)}
              placeholder="Email"
              className={`border p-2 rounded w-1/2 ${
                m.isAdmin && "bg-gray-100"
              }`}
              required
            />
            {m.isAdmin ? (
              <span className="text-xs font-semibold text-green-600">
                (Admin)
              </span>
            ) : (
              <button
                type="button"
                onClick={() => deleteMember(i)}
                className="text-red-500 text-sm hover:underline"
              >
                ✖
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addMember}
          className="text-blue-600 font-medium hover:underline"
        >
          + Add Member
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Group &amp; Send Invites
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
