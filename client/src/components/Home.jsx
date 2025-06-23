import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    if (!token) {
      navigate('/users/login');
    }
  }, [navigate]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
      },
      async (error, result) => {
        const info = result.info;
        if (info.secure_url) {
          const url = info.secure_url;
          setVideoUrl(url);
          await uploadToDatabase(url);
        }
      }
    );
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwttoken');
    navigate('/users/login');
  };

  const uploadToDatabase = async (videoUrl) => {
    try {
      const token = localStorage.getItem('jwttoken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id;

      const response = await fetch(`http://localhost:5000/users/${userId}`);
      if (!response.ok) {
        console.error('Failed to fetch user:', response.status);
        return;
      }

      const data = await response.json();
      const username = data.firstName + data.lastName;

      const res = await axios.post(
        'http://localhost:5000/videos/upload',
        { videoUrl, username, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Video info uploaded to database:', res.data);
    } catch (error) {
      console.error('Error uploading video info:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="sm:text-sm md:text-2xl font-bold">Welcome to StreamVault</h1>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-xs sm:max-w-none justify-center items-center">

        <button
          onClick={() => navigate('/videos')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          See Video List
        </button>

        <button
          onClick={() => widgetRef.current.open()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Upload New Video
        </button>

        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

    </div>
  );
};

export default Home;
