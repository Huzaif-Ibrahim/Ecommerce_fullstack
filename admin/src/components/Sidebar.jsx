import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-16 lg:max-w-64 lg:w-full min-h-screen border-r bg-gray-50 border-zinc-500'>
      <div className='w-full flex flex-col gap-4 pt-4 lg:pl-8'>
        <NavLink to={'/'} className='w-full p-4 border-y border-l lg:rounded-tl-lg lg:rounded-bl-lg border-zinc-400 flex items-center'>
          <img src={assets.order_icon} className='w-8 lg:h-6 pr-2' alt="" />
          <p className='hidden lg:block'>List Items</p>
        </NavLink>

        <NavLink to={'/add'} className='w-full p-4 border-y border-l lg:rounded-tl-lg lg:rounded-bl-lg border-zinc-400 flex items-center'>
          <img src={assets.add_icon} className='w-8 lg:h-6 pr-2' alt="" />
          <p className='hidden lg:block'>Add Items</p>
        </NavLink>

        <NavLink to={'/orders'} className='w-full p-4 border-y border-l lg:rounded-tl-lg lg:rounded-bl-lg border-zinc-400 flex items-center'>
          <img src={assets.order_icon} className='w-8 lg:h-6 pr-2' alt="" />
          <p className='hidden lg:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar