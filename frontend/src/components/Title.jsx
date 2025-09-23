import React from 'react'

const Title = ({ title1, title2 }) => {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
        <p className='uppercase text-[#707070] font-normal'>{title1} <span className='font-medium text-[#343434]'>{title2}</span></p>
        <p className='w-8 md:w-12 h-[1px] sm:h-[2px] bg-[#414141] border-0'></p>
    </div>
  )
}

export default Title