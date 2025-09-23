import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
  return (
    <nav className='bg-gray-50 flex justify-between items-center px-4 md:px-12 py-2 md:py-4 border-b border-zinc-400'>
      <Link to={'/'} className='h-10 md:h-14 w-fit'>
        <img src={assets.logo} alt="logo" className='h-full' />
      </Link>

      <button onClick={() => setToken('')} className='cursor-pointer bg-zinc-600 rounded-4xl text-white text-xs md:text-base px-6 py-2'>Logout</button>
    </nav>
  )
}

export default Navbar