import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Search = () => {

    const location = useLocation()

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)

    const [visible, setVisible] = useState(false)

    useEffect(() => {
      if(location.pathname.includes('collection')){
        setVisible(true)
      } else {
        setVisible(false)
      }
    },[location])

  return showSearch && visible ? (
    <div className='w-full bg-white py-2 md:py-5 flex gap-4 items-center justify-center text-center'>
        <div className='w-fit md:w-3/4 bg-inherit px-4 md:px-6 py-3 border-2 border-gray-300 rounded-4xl inline-flex items-center gap-2'>
            <input type="text" placeholder='Search product...' className='flex-1 outline-0 max-w-full' value={search} onChange={(e) => setSearch(e.target.value)} />
            <img src={assets.search_icon} className='w-5 h-5' alt="search" />
        </div>

        <img onClick={() => setShowSearch(false)} src={assets.cross_icon} className='cursor-pointer w-4 h-4' alt="close" />
    </div>
  ) : null
}

export default Search