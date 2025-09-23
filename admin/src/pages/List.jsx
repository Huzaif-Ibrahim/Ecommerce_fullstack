import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { headers : {token} })
      if(response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, {headers: {token}})
      if (response.data.success) {
        await fetchList()
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  },[])

  return (
    <div className='p-4 lg:p-12 bg-gray-50 w-full flex flex-col'>
      <p className='text-gray-700 text-lg mb-4'>All Products List</p>

      <div className='grid grid-cols-[2fr_3fr_1fr] lg:grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 text-gray-600 p-2 border border-gray-200'>
        <b className='text-sm lg:text-base pl-2'>Image</b>
        <b className='text-sm lg:text-base'>Name</b>
        <b className='hidden lg:block text-sm lg:text-base'>Category</b>
        <b className='hidden lg:block text-sm lg:text-base'>Price</b>
        <b className='text-center text-sm lg:text-base'>Action</b>
      </div>

      {
        list.map((item,indx) => {
          return <div key={indx} className='border-b border-gray-200 grid grid-cols-[2fr_3fr_1fr] lg:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-gray-100 text-gray-600 p-2 border-b-l'>
            <img src={item.image[0]} className='w-full h-full max-w-[100px] p-2' alt="" />
            <p className='text-xs lg:text-base wrap-anywhere'>{item.name}</p>
            <p className='hidden lg:block'>{item.category}</p>
            <p className='hidden lg:block'>{item.subCategory}</p>
            <p className='text-center cursor-pointer' onClick={() => removeProduct(item._id)}>X</p>
      </div>
        })
      }
    </div>
  )
}

export default List