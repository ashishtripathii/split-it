import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const joinGroup = async () => {
      const token = localStorage.getItem('token');

      // If user is not logged in, redirect to login with redirect query param
      if (!token) {
        navigate(`/login?redirect=/group/join/${groupId}`);
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:5000/api/groups/join/${groupId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStatus('success');
        setMessage(response.data.message || 'Successfully joined the group!');
        
        // Optional: redirect to dashboard or group page after delay
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (error) {
        console.error('Join Group Failed:', error);
        setStatus('error');

        // Show specific backend message if available
        setMessage(error?.response?.data?.message || 'Error joining group. Please check your invitation or login.');
      }
    };

    joinGroup();
  }, [groupId, navigate]);

  return (
    <div className="p-4 text-center">
      {status === 'loading' && <p className="text-blue-600">Joining group...</p>}
      {status === 'success' && <p className="text-green-600">{message}</p>}
      {status === 'error' && <p className="text-red-600">{message}</p>}
    </div>
  );
};

export default JoinGroupPage;
