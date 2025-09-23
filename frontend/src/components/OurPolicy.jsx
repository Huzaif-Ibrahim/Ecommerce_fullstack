import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='my-16 md:my-32'>
        <div className='py-8 flex flex-col md:flex-row items-center justify-center gap-20'>
            <div className='flex flex-col gap-2 text-center items-center text-base'>
                <img src={assets.exchange_icon} alt="exchange-icon" className='w-10' />
                <p className='font-semibold text-[#373737]'>Easy Exchange Policy</p>
                <p className='text-[#898989]'>We offer hassle free  exchange policy</p>
            </div>

            <div className='flex flex-col gap-2 text-center items-center text-base'>
                <img src={assets.quality_icon} alt="exchange-icon" className='w-10' />
                <p className='font-semibold text-[#373737]'>7 Days Return Policy</p>
                <p className='text-[#898989]'>We provide 7 days free return policy</p>
            </div>

            <div className='flex flex-col gap-2 text-center items-center text-base'>
                <img src={assets.support_img} alt="exchange-icon" className='w-10' />
                <p className='font-semibold text-[#373737]'>Best Customer Support</p>
                <p className='text-[#898989]'>We provide 24/7 customer support</p>
            </div>
        </div>
    </div>
  )
}

export default OurPolicy