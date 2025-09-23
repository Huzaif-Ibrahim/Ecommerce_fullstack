import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotals = () => {

    const { subTotal, currency, delivary_fee } = useContext(ShopContext)

    return (
        <div className='mt-16 flex justify-end'>
            <div className='w-full'>
                <div className='text-lg md:text-xl'><Title title1={'Cart'} title2={'totals'} /></div>

                <div className='flex flex-col w-full'>
                    <div className='text-[#555555] w-full text-base flex items-center justify-between py-2 border-b border-gray-300'><p>Subtotal</p><p>{currency}{subTotal()}</p></div>
                    <div className='text-[#555555] w-full text-base flex items-center justify-between py-2 border-b border-gray-300'><p>Shipping Fee</p><p>{currency}{delivary_fee}</p></div>
                    <div className='text-[#454545] w-full text-base flex items-center justify-between py-2 border-b border-gray-300'><b>Total</b><b>{currency}{subTotal() + delivary_fee}</b></div>
                </div>

            </div>
        </div>
    )
}

export default CartTotals