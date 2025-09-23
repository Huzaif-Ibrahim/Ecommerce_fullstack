import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Subscribe from '../components/Subscribe'

const About = () => {
  return (
    <div className='pb-16 pt-8'>
      <div className='mb-24'>
        <div className='text-2xl text-center mb-4 lg:mb-10'><Title title1={'About'} title2={'us'} /></div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24'>
          <img src={assets.about_img} className='h-full w-full' alt="" />

          <div className='flex flex-col justify-center gap-6 text-[#6D6D6D] text-sm lg:text-lg'>
            <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <b>Our Mission</b>
            <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
        </div>
      </div>


      <div>
        <div className='text-2xl mb-4 lg:mb-10'><Title title1={'why'} title2={'choose us'} /></div>

        <div className='grid grid-cols-1 lg:grid-cols-3'>
          <div className='border border-[#ABABAB] p-16 flex flex-col gap-6'>
            <b className='text-[#2A2A2A]'>Quality Assurance:</b>
            <p className='text-[#6D6D6D]'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>

          <div className='border-x lg:border-y border-[#ABABAB] p-16 flex flex-col gap-6'>
            <b className='text-[#2A2A2A]'>Convenience: </b>
            <p className='text-[#6D6D6D]'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>

          <div className='border border-[#ABABAB] p-16 flex flex-col gap-6'>
            <b className='text-[#2A2A2A]'>Exceptional Customer Service:</b>
            <p className='text-[#6D6D6D]'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      <div className='py-8 lg:py-16'>
        <Subscribe />
      </div>
    </div>

  )
}

export default About