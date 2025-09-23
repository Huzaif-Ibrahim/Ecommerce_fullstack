import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    if(!token){
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {headers: {token}})
      if(response.data.success){
        setOrders(response.data.orders)
      } else {
        toast.error('Error while fetching data..')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status: event.target.value}, {headers: {token}})
      if(response.data.success){
        await fetchOrders()
        toast.success('Updated.')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  return (
    <div className='bg-gray-50 p-4 lg:p-12 text-gray-700'>
      <p className='text-gray-700 text-lg mb-4 uppercase'>Orders</p>
      {
        orders.map((item, key) => {
          return <div key={key} className='grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-2 border border-gray-400 p-4 rounded-lg mb-4'>
            <img src={assets.parcel_icon} className='h-32' alt="" />

            <div className='w-fit'>
              {
                item.items.map((e,i) => {
                  return <p key={i}>{i + 1}. {e.name}</p>
                })
              }
              <p className='mt-3 font-medium'>{item.address.firstname} {item.address.lastname}</p>
              <p>{item.address.street}</p>
              <p>{item.address.city}, {item.address.state}, {item.address.country}, {item.address.zipcode}</p>
              <p>{item.address.phone}</p>
            </div>

            <div className='lg:ml-4'>
              <p>Items: {item.items.length}</p>
              <p>Method: {item.paymentMethod}</p>
              <p>Payment: {item.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(item.date).toLocaleDateString()}</p>
            </div>

            <div>
              <p>₹{item.amount}</p>
            </div>

            <div>
              <select onChange={(e) => statusHandler(e, item._id)} value={item.status} className='p-2 outline-0'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivary">Out for delivary</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Orders