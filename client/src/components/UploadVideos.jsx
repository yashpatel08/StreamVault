import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const UploadVideos = () => {
  const navigate = useNavigate();
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [videoUrl, setVideoUrl] = useState('');
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current  = cloudinaryRef.current.createUploadWidget({
      cloudName: 'digj39la1',
      uploadPreset: 'stream'
    }, function (error, result) {
      if (!error && result && result.event === "success") {
        console.log("Video uploaded successfully!");
        console.log("Video URL:", result.info.secure_url); 
        setVideoUrl(result.info.secure_url);
      }
    })
  },[])


  useEffect(() => {
    const token = localStorage.getItem('jwttoken');
    if (!token) navigate('/users/login');
  }, [navigate]);



  return (
    <>

    <button onClick={() => widgetRef.current.open()}>
      Upload
    </button>
    
    </>
  )
};

export default UploadVideos;