import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='border-y border-gray-300 py-8 flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 items-center lg:items-start'>

                <div className='flex flex-col items-center gap-6 mb-4 lg:mb-0 text-center lg:text-left lg:items-start'>
                    <Link to={'/'} >
                        <img src={assets.logo} alt="logo" className='w-36' />
                    </Link>
                    <p className='text-sm text-[#595959] max-w-xl'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 lg:gap-36">
                    <div className='flex flex-col gap-6'>
                    <p className='hidden lg:block text-[#5d5c5c] font-semibold text-lg'>COMPANY</p>
                    <ul className='flex lg:flex-col gap-3 text-[#595959] font-normal'>
                        <li className='cursor-pointer hover:text-[#494949]'>Home</li>
                        <li className='cursor-pointer hover:text-[#494949]'>About us</li>
                        <li className='cursor-pointer hover:text-[#494949]'>Delivery</li>
                        <li className='cursor-pointer hover:text-[#494949]'>Privacy policy</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-6'>
                    <p className='hidden lg:block text-[#5A5A5A] font-semibold text-lg'>GET IN TOUCH</p>
                    <ul className='flex lg:flex-col gap-3 text-[#595959] font-normal'>
                        <li >+1-212-456-7890</li>
                        <li>greatstackdev@gmail.com</li>
                    </ul>
                </div>
                </div>

            </div>


            <div className='py-4 flex items-center justify-center'>
                <p className='text-[#595959] text-sm text-center'>Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer