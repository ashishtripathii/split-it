import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashBoardAside from '../components/DashBoardAside';

const JoinGroupPage = () => {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState({});

  // Fetch invitations
  const fetchInvitations = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/group/join');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/groups/invitations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvitations(data.invitations || []);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
    // eslint-disable-next-line
  }, [navigate]);

  // Handle join/reject actions
  const handleAction = async (groupId, action) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setActionStatus((prev) => ({ ...prev, [groupId]: 'processing' }));

    try {
      if (action === 'join') {
        await axios.post(
          `http://localhost:5000/api/groups/join/${groupId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActionStatus((prev) => ({ ...prev, [groupId]: 'join' }));
      } else if (action === 'reject') {
        await axios.delete(
          `http://localhost:5000/api/groups/reject/${groupId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActionStatus((prev) => ({ ...prev, [groupId]: 'rejected' }));
      }
      // Refresh invitations after action
      fetchInvitations();
    } catch (error) {
      console.error(`Failed to ${action} group`, error);
      setActionStatus((prev) => ({ ...prev, [groupId]: 'error' }));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cyan-100 to-teal-50 font-mono">
      <DashBoardAside />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-8 drop-shadow">
            Your Group Invitations
          </h2>

          {loading ? (
            <p className="text-center text-blue-600 text-lg">Loading invitations...</p>
          ) : invitations.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              You have no pending group invitations.
            </p>
          ) : (
            <div className="space-y-6">
              {invitations.map((group) => (
                <div
                  key={group._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-teal-800">{group.name}</h3>
                    <p className="text-sm text-gray-500">
                      Invited by: <span className="font-medium">{group.inviterName}</span>
                    </p>
                  </div>

                  <div className="space-x-3">
                    {actionStatus[group._id] === 'join' ? (
                      <span className="text-green-600 font-semibold">Joined</span>
                    ) : actionStatus[group._id] === 'rejected' ? (
                      <span className="text-red-500 font-semibold">Rejected</span>
                    ) : actionStatus[group._id] === 'processing' ? (
                      <span className="text-blue-500">Processing...</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAction(group._id, 'join')}
                          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-xl shadow-sm transition duration-200"
                          disabled={actionStatus[group._id] === 'processing'}
                        >
                          Join
                        </button>
                        <button
                          onClick={() => handleAction(group._id, 'reject')}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl shadow-sm transition duration-200"
                          disabled={actionStatus[group._id] === 'processing'}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JoinGroupPage;