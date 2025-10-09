import React, { useContext, useEffect, useState } from 'react'
import { backendUrl, ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartRow from '../components/CartRow'
import CartTotals from '../components/CartTotals'
import axios from 'axios'
import { toast } from 'react-toastify'

const Cart = () => {

  const { products, cartItem, navigate, token } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])
  const [proceedLoading, setProceedLoading] = useState(false)

  const checkLogin = async () => {
    setProceedLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/user/checklogin',{},{headers: {token}})

      if(!response.data.success){
        navigate('/login')
        toast.info(response.data.message)
      } else {
        navigate('/place-order')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setProceedLoading(false)
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItem, products])

  return (
    <>
      <div className='my-10 md:my-20 min-h-[80vh]'>
        <div className='text-2xl md:text-4xl'>
          <Title title1={'Your'} title2={'cart'} />
        </div>
        {
          cartData.length > 0 ?
            <div>
              <div className='flex flex-col border-t border-gray-300 my-4'>
                {
                  cartData.map((item, indx) => {
                    const productData = products.find(e => e._id === item._id)
                    return <CartRow key={indx} productData={productData} id={item._id} size={item.size} quantity={item.quantity} />
                  })
                }
              </div>
              <div className='flex flex-col w-full items-end'>
                <div className='max-w-sm w-full'><CartTotals /></div>
                <div className='mt-6 w-full flex justify-end'>
                  <button onClick={() => checkLogin()} className='px-4 py-2 bg-black text-white uppercase text-sm cursor-pointer'>{
                    proceedLoading ? 'Please wait...' : 'proceed to checkout'
                    }</button>
                </div>
              </div>
            </div>
            : <p className='text-lg font-semibold border-t text-[#707070] border-gray-300 my-4 py-4'>Your cart is Empty.</p>
        }
      </div>
    </>
  )
}

export default Cart