import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const CartRow = ({ id, size, quantity, productData }) => {

    const { currency, updateCartQuantity } = useContext(ShopContext)


    return (
        <div className='border-b border-gray-300 py-4 flex justify-between items-center'>
            <div className='flex gap-3 md:gap-6 lg:w-[450px]'>
                <img src={productData.image[0]} className='h-28' alt="product_image" />
                <div className='flex flex-col gap-2'>
                    <p className='font-normal text-[#494949] text-sm md:text-lg'>{productData.name}</p>
                    <div className='flex gap-4 items-center'>
                        <p className='text-[#494949] font-light text-base md:text-xl'>{currency}{productData.price}</p>
                        <div className='flex items-center justify-center text-[#1D1D1D] h-6 w-6 md:h-10 md:w-10 text-center border-2 border-gray-100 bg-[#FBFBFB]'>
                            {size}
                        </div>
                    </div>
                    <input type="number" defaultValue={quantity} min={1} className='outline-0 md:hidden px-1 py-1 max-w-16 md:max-w-20 border border-gray-100 bg-[#FBFBFB]' />

                </div>
            </div>

            <input 
              type="number" 
              defaultValue={quantity} 
              min={1} 
              className='hidden outline-0 md:block px-1 py-1 max-w-10 md:max-w-20 border border-gray-100 bg-[#FBFBFB]' 
              onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateCartQuantity(id,size,Number(e.target.value))}
            />

            <div className='h-5 w-5 cursor-pointer'>
                <img 
                  src={assets.bin_icon} 
                  className='h-full' 
                  alt="delete" 
                  onClick={() => updateCartQuantity(id, size, 0)}
                />
            </div>
        </div>
    )
}

export default CartRow