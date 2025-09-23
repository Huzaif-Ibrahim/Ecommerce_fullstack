import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
 import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BASE_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div>
      <ToastContainer />
      {
        token === '' ? <Login setToken={setToken} /> : <>
          <Navbar setToken={setToken} />
          <div className='flex w-full bg-gray-50'>
            <Sidebar />
            <div className='w-full max-h-screen overflow-y-scroll'>
              <Routes>
              <Route path='/add' element={<Add token={token} />} />
              <Route path='/' element={<List token={token} />} />
              <Route path='/orders' element={<Orders token={token} />} />
            </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App