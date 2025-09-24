import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Navbar = () => {

  const { setShowSearch, cartNumber, navigate, token, setToken, setCartItem } = useContext(ShopContext)
  const location = useLocation()

  const [isMenu, setIsMenu] = useState(false)
  const [accountMenu, setAccountMenu] = useState(false)

  const logout = async () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
    navigate('/login')
    toast.success('Logged out successfully.')
  }


  return (
    <nav className='py-5 flex items-center justify-between border-b border-gray-400 font-medium'>
      <Link to={'/'} >
        <img src={assets.logo} alt="logo" className='lg:w-36 w-26' />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 uppercase'>

        <NavLink to={'/'} className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='h-[1.5px] border-none w-2/4 bg-gray-700 hidden' />
        </NavLink>

        <NavLink to={'/collection'} className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='h-[1.5px] border-none w-2/4 bg-gray-700 hidden' />
        </NavLink>

        <NavLink to={'/about'} className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='h-[1.5px] border-none w-2/4 bg-gray-700 hidden' />
        </NavLink>

        <NavLink to={'/contact'} className='flex flex-col items-center gap-1'>
          <p>contact</p>
          <hr className='h-[1.5px] border-none w-2/4 bg-gray-700 hidden' />
        </NavLink>

      </ul>

      <div className='flex gap-6 items-center'>

        <img onClick={() => {
          setShowSearch(true)
          location.pathname != '/collection' ? navigate('/collection') : null
        }} src={assets.search_icon} className='w-5 cursor-pointer' alt="search" />

        <div className='group relative hidden lg:block'>
          <img src={assets.profile_icon} onClick={() => !token && navigate('/login')} className='w-5 cursor-pointer' alt="profile" />

          {
            token && <div className={`absolute shadow group-hover:block hidden dropdown-menu right-0 pt-3`}>
              <div className="flex flex-col font-light items-center w-32 bg-gray-50 text-gray-600 px-4">
                <p className='hover:text-black cursor-pointer py-3 w-full border-b border-zinc-200'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='hover:text-black cursor-pointer py-3 w-full border-b border-zinc-200'>Orders</p>
                <p className='hover:text-red-500 cursor-pointer py-3 w-full border-b border-zinc-200' onClick={logout}>Logout</p>
              </div>
            </div>
          }
        </div>

        <div className='group relative block lg:hidden'>
          <div className="flex items-center gap-1" onClick={() => setAccountMenu(!accountMenu)}>
            <img src={assets.profile_icon} onClick={() => !token && navigate('/login')} className='w-5 cursor-pointer' alt="profile" />
            <img src={assets.dropdown_icon} className={`w-1.5 ${accountMenu ? '-rotate-90' : 'rotate-90'} transition-all duration-500`} alt="" />
          </div>


          {
            accountMenu && <div className={`absolute shadow dropdown-menu right-0`}>
              <div className="flex flex-col font-light items-center w-32 bg-gray-50 text-gray-600 px-4">
                <p className='hover:text-black cursor-pointer py-3 w-full border-b border-zinc-200'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='hover:text-black cursor-pointer py-3 w-full border-b border-zinc-200'>Orders</p>
                <p className='hover:text-red-500 cursor-pointer py-3 w-full border-b border-zinc-200' onClick={logout}>Logout</p>
              </div>
            </div>
          }
        </div>

        <Link to={'/cart'} className='relative' >
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
          <p className='absolute -right-[5px] -bottom-[5px] text-center aspect-square w-4 text-[8px] leading-4 bg-black text-white rounded-full'>{cartNumber()}</p>
        </Link>

        <img src={assets.menu_icon} onClick={() => setIsMenu(true)} className='w-5 cursor-pointer sm:hidden' alt="menu" />
      </div>

      <div className={`z-9 absolute overflow-hidden bg-white top-0 bottom-0 right-0 transition-all duration-500 ${isMenu ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col items-start p-3 text-gray-600">
          <div className='flex items-center gap-2 mb-4' onClick={() => setIsMenu(false)} >
            <img src={assets.dropdown_icon} className='w-2 rotate-180' alt="" />
            <p>Back</p>
          </div>

          <NavLink to={'/'} className='w-full px-2 py-4 border-b border-zinc-300' onClick={() => setIsMenu(false)} >HOME</NavLink>
          <NavLink to={'/collection'} className='w-full px-2 py-4 border-b border-zinc-300' onClick={() => setIsMenu(false)} >COLLECTION</NavLink>
          <NavLink to={'/about'} className='w-full px-2 py-4 border-b border-zinc-300' onClick={() => setIsMenu(false)} >ABOUT</NavLink>
          <NavLink to={'/contact'} className='w-full px-2 py-4 border-b border-zinc-300' onClick={() => setIsMenu(false)} >CONTACT</NavLink>

        </div>
      </div>
    </nav>
  )
}

export default Navbar