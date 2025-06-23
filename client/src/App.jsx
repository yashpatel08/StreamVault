import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import UploadVideos from './components/UploadVideos'
import VideoList from './components/VideoList'
import Login from './components/Login'
import Register from './components/Register'

function App() {

  return (
    <div>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/users/login' element={<Login />}/>
        <Route path='/users/register' element={<Register />}/>
        <Route path='/video/upload' element={<UploadVideos />}/>
        <Route path='/videos' element={<VideoList />}/>
      </Routes>
    </div>
  )
}

export default App
