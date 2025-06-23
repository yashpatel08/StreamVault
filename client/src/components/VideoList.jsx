import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwttoken');
        if (!token) {
            navigate('/users/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('jwttoken');
                const res = await fetch('http://localhost:5000/videos/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch videos');
                }

                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error('Error fetching videos:', err.message);
            }
        };

        fetchVideos();
    }, []);

return (
  <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Uploaded Videos</h1>

    <div className="space-y-4 sm:hidden">
      {videos.length === 0 && (
        <p className="text-center text-gray-500">No videos found.</p>
      )}
      {videos.map((video, index) => (
        <div key={video._id} className="bg-white rounded shadow p-4 space-y-2">
          <p className="text-sm text-gray-600 font-semibold">#{index + 1} - {video.username}</p>
          <p className="text-blue-600 break-all">
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">{video.videoUrl}</a>
          </p>
          <p className="text-sm text-gray-500">
            {new Date(video.uploadedAt).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
          <video className="w-full" controls>
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>

    <div className="hidden sm:block overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Video URL</th>
            <th className="py-2 px-4 border-b">Upload Date</th>
            <th className="py-2 px-4 border-b">Preview</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={video._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{video.username}</td>
              <td className="py-2 px-4 border-b text-blue-600 truncate max-w-xs">
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                  {video.videoUrl}
                </a>
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(video.uploadedAt).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </td>
              <td className="py-2 px-4 border-b">
                <video width="150" controls>
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default VideoList;
