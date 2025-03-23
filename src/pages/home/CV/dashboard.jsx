import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  // Check if token exists
  useEffect(() => {
    if (!token) {
      toast.error('Login First');
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/users/currentuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response Data:', response.data);
        setUserId(response.data.userId);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user details. Please log in again.');
        navigate('/login');
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, navigate]);

  // Handle navigation to /addcvdetails
  const handleNavigate = () => {
    if (!userId) {
      toast.error('User ID not found. Please log in again.');
      navigate('/login');
    } else {
      navigate('/addcvdetails', {
        state: {
          userId,
          username,
        },
      });
    }
  };

  return (
    <div className="bg-gray-200 h-screen w-full flex justify-center items-center">
      <div className="w-[900px] h-[600px] bg-gray-100 shadow-2xl">
        <div className="flex w-full h-[250px] justify-center items-center">
          <div
            className="bg-gray-300 w-[200px] h-[200px] hover:bg-gray-400 flex justify-center items-center text-8xl hover:text-blue-200 rounded-2xl"
            onClick={handleNavigate}
          >
            <CiSquarePlus />
          </div>
        </div>
      </div>
    </div>
  );
}