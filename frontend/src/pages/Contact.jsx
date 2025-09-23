import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Subscribe from '../components/Subscribe'

const Contact = () => {
  return (
    <div className='pb-16 pt-8 lg:py-16'>
      <div className='mb-24 max-w-4xl mx-auto'>
        <div className='text-2xl text-center mb-4 lg:mb-10'><Title title1={'contact'} title2={'us'} /></div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          <img src={assets.contact_img} className='h-full w-full' alt="" />

          <div className='flex flex-col text-[#6D6D6D] justify-center gap-4 lg:gap-6'>
            <b className='uppercase text-[#4E4E4E] text-xl'>Our Store</b>

            <div className='flex flex-col gap-1'>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>

            <div className='flex flex-col gap-1 mb-4'>
              <p>Tel: (415) 555‑0132</p>
              <p>Email: greatstackdev@gmail.com</p>
            </div>

            <b className='uppercase text-[#4E4E4E] text-xl'>Careers at Forever</b>

            <p>Learn more about our teams and job openings.</p>

            <button className='cursor-pointer py-4 px-8 border border-black/80 w-fit'>Explore Jobs</button>
          </div>

        </div>
      </div>


      <Subscribe />
    </div>

  )
}

export default Contact