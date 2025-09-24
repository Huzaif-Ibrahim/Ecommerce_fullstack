import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotals from '../components/CartTotals'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../context/ShopContext'

const PlaceOrder = () => {

  const { navigate, token, cartItem, setCartItem, products, delivary_fee, subTotal } = useContext(ShopContext)

  const [method, setMethod] = useState('cod')
  const [submitLoading, setSubmitLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      reciept: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            navigate('/orders')
            setCartItem({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    try {
      let orderItems = []

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            let itemInfo = structuredClone(products.find(elem => elem._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: subTotal() + delivary_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItem({})
            navigate('/orders', { state: { refresh: true } })
            toast.success(response.data.message)
          } else {
            toast.info('Sign up to order')
            navigate('/login')
          }
          break

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break

        default:
          break
      }
    } catch (error) {
      console.log(error)
    }finally{
      setSubmitLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleOnSubmit(e)} className='my-10 md:my-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-40'>
          <div>
            <div className='text-xl md:text-2xl'>
              <Title title1={'delivary'} title2={'information'} />
            </div>

            <div className='flex flex-col gap-4 md:gap-6 w-full mt-2 md:mt-6'>
              <div className="flex gap-4 flex-row w-full">
                <input required onChange={onChangeHandler} value={formData.firstname} name='firstname' type="text" placeholder='First name' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434] w-full' />
                <input required onChange={onChangeHandler} value={formData.lastname} name='lastname' type="text" placeholder='Last name' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434] w-full' />
              </div>
              <input required onChange={onChangeHandler} value={formData.email} name='email' type="email" placeholder='Email adress' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434]' />
              <input required onChange={onChangeHandler} value={formData.street} name='street' type="text" placeholder='Street' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434]' />
              <div className="flex gap-4 flex-row w-full">
                <input required onChange={onChangeHandler} value={formData.city} name='city' type="text" placeholder='City' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434] w-full' />
                <input required onChange={onChangeHandler} value={formData.state} name='state' type="text" placeholder='State' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434] w-full' />
              </div>
              <div className="flex gap-4 flex-row w-full">
                <input required onChange={onChangeHandler} value={formData.zipcode} name='zipcode' type="text" placeholder='Zip code' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434] w-full' />
                <input required onChange={onChangeHandler} value={formData.country} name='country' type="text" placeholder='Country' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434] w-full' />
              </div>
              <input required onChange={onChangeHandler} value={formData.phone} name='phone' type="text" placeholder='Phone' className='outline-0 rounded-sm border border-[#C5C5C5] p-2 text-[#343434]' />
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <CartTotals />
            <div className='mt-12 md:mt-15 flex flex-col'>
              <div className='text-lg md:text-xl'>
                <Title title1={'payment'} title2={'method'} />
              </div>
              <div className='flex justify-between md:grid grid-cols-3 md:gap-3 mt-2 w-full'>
                {/* <div onClick={() => setMethod('stripe')} className='cursor-pointer border border-[#B3B3B3] p-3 md:p-2 flex items-center gap-2'>
                  <p className={`${method === 'stripe' ? 'bg-green-500 border-2 border-gray-800' : 'bg-transparent border border-[#B3B3B3] '} h-3.5 w-3.5 rounded-full`}></p>
                  <img src={assets.stripe_logo} className='h-4' alt="" />
                </div> */}

                <div onClick={() => setMethod('razorpay')} className='cursor-pointer border border-[#B3B3B3] p-3 md:p-2 flex items-center gap-2'>
                  <p className={`${method === 'razorpay' ? 'bg-green-500 border-2 border-gray-800' : 'bg-transparent border border-[#B3B3B3]'} h-3.5 w-3.5 rounded-full`}></p>
                  <img src={assets.razorpay_logo} className='h-4' alt="" />
                </div>

                <div onClick={() => setMethod('cod')} className='cursor-pointer border border-[#B3B3B3] p-3 md:p-2 flex items-center gap-2'>
                  <p className={`${method === 'cod' ? 'bg-green-500 border-2 border-gray-800' : 'bg-transparent border border-[#B3B3B3] '} h-3.5 w-3.5 rounded-full`}></p>
                  <p className='text-[#A6A6A6] uppercase text-xs md:text-sm font-medium'>Cash on delivary</p>
                </div>
              </div>
              <div className='flex justify-end mt-6'>
                <button type='submit' className='px-4 py-2 bg-black text-white uppercase text-sm cursor-pointer' >
                  {submitLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </form>
    </>
  )
}

export default PlaceOrder