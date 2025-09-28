import React, { useContext, useEffect, useState } from 'react'
import { backendUrl, ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import CartLoading from '../components/CartLoading'

const Orders = () => {

  const { currency, token } = useContext(ShopContext)

  const location = useLocation()

  const [orders, setOrders] = useState([])
  const [orderLoading, setOrderLoading] = useState(false)

  const fetchOrders = async () => {
    setOrderLoading(true)
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersList = []
        response.data.orders.map(order => {
          order.items.map(item => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['data'] = order.date
            allOrdersList.push(item)
          })
        })
        setOrders(allOrdersList.reverse())
      } else {
        toast.error('An error occured!')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setOrderLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token, location.state])

  return (
    <div className='my-10 md:my-20 min-h-[80vh]'>
      <div className='text-2xl md:text-4xl'>
        <Title title1={'Your'} title2={'orders'} />
      </div>

      <div className='flex flex-col border-t border-gray-300 my-4'>
        {
          orderLoading ? ([...Array(3)].map(_ => {
            return <CartLoading />
          })) : orders.filter(data => !data.status.includes('cancelled')).length > 0 ?
            orders.filter(data => !data.status.includes('cancelled')).map((order, indx) => {
              return <div key={indx} className='border-b border-gray-300 py-4 flex justify-between items-center'>
                <div className='flex gap-3 md:gap-6 w-[300px] lg:w-[450px]'>
                  <img src={order.image[0]} className='md:h-32 h-44' alt="product_image" />
                  <div className='flex flex-col text-sm md:text-base gap-2'>
                    <p className='font-normal text-[#494949] text-sm md:text-lg'>{order.name}</p>
                    <div className='flex flex-col md:flex-row gap-1 md:gap-4 text-[#494949] md:items-center'>
                      <p className='font-light text-base md:text-lg'>{currency}{order.price}</p>
                      <p>Quantity: {order.quantity}</p>
                      <p>Size: {order.size}</p>
                    </div>
                    <p className='text-[#989898] font-light'><b className='text-[#494949]'>Payment: </b>{order.paymentMethod}</p>
                    <p className='text-[#989898] font-light'><b className='text-[#494949]'>Date: </b>{new Date(order.date).toDateString()}</p>
                    <div className='flex items-center gap-1 md:hidden'>
                      <div className='h-2 w-2 rounded-full bg-green-600'></div>
                      <p className='text-[#454545] text-xs'>{order.status}</p>
                    </div>

                  </div>
                </div>

                <div className='hidden md:flex items-center gap-1'>
                  <div className='h-3 w-3 rounded-full bg-green-600'></div>
                  <p className='text-[#454545]'>{order.status}</p>
                </div>

                <div className='flex flex-col items-center justify-center gap-1'>
                  <button onClick={fetchOrders} className='border border-[#BABABA] p-2 md:px-6 cursor-pointer text-[10px] md:text-sm text-[#454545]'>
                    Track Order
                  </button>
                </div>
              </div>
            }) : <p className='text-lg font-semibold text-[#707070] my-4 py-4'>No Orders...</p>
        }
      </div>

      <p className='mt-16 pt-2 text-gray-600 border-t border-gray-400'>Cancelled Orders</p>
      {
        orders.filter(data => data.status.includes('cancelled')).map((item, indx) => {
          return <div key={indx} className='relative opacity-50 border-b border-gray-300 py-4 flex justify-between items-center'>
            <div className='flex gap-3 md:gap-6 w-[300px] lg:w-[450px]'>
              <img src={item.image[0]} className='md:h-32 h-44' alt="product_image" />
              <div className='flex flex-col text-sm md:text-base gap-2'>
                <p className='font-normal text-[#494949] text-sm md:text-lg'>{item.name}</p>
                <div className='flex flex-col md:flex-row gap-1 md:gap-4 text-[#494949] md:items-center'>
                  <p className='font-light text-base md:text-lg'>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='text-[#989898] font-light'><b className='text-[#494949]'>Payment: </b>{item.paymentMethod}</p>
                <p className='text-[#989898] font-light'><b className='text-[#494949]'>Date: </b>{new Date(item.date).toDateString()}</p>
                <div className='flex items-center gap-1 md:hidden'>
                  <div className='h-2 w-2 rounded-full bg-green-600'></div>
                  <p className='text-[#454545] text-xs'>{item.status}</p>
                </div>

              </div>
            </div>

            <div className='hidden md:flex items-center gap-1'>
              <div className='h-3 w-3 rounded-full bg-green-600'></div>
              <p className='text-[#454545]'>{item.status}</p>
            </div>

            <div className='flex flex-col items-center justify-center gap-1'>
              <button onClick={fetchOrders} className='border border-[#BABABA] p-2 md:px-6 cursor-pointer text-[10px] md:text-sm text-[#454545]'>
                Track Order
              </button>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Orders