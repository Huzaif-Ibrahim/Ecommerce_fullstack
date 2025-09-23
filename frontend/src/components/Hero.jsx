import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border-r border-l border-b border-gray-400">
        <div className='flex items-center justify-center w-full sm:w-1/2 py-10 sm:py-0'>
            <div className='flex flex-col text-[#414141] '> 
                <div className='flex items-center gap-1'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141] border-0'></p>
                    <p className='uppercase text-sm lg:text-base font-medium' >our bestseller</p>
                </div>

                <h1 className='prata-font font-normal text-3xl lg:text-5xl leading-relaxed sm:py-3' >Latest Arrivals</h1>

                <div className='flex items-center gap-1'>
                    <p className='uppercase text-sm lg:text-base font-semibold' >shop now</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141] border-0'></p>
                </div>
            </div>
        </div>

        <img src={assets.hero_img} className='w-full sm:w-1/2' alt="hero-img" />
    </div>
  )
}

export default Hero