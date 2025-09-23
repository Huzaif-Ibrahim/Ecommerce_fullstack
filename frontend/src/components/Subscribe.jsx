import React, { useState } from 'react'

const Subscribe = () => {

    const [subInput, setSubInput] = useState('')

    const handleInput = (e) => {
        setSubInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubInput('')
    }

  return (
    <div className='my-16 md:my-32'>
        <div className="py-8 flex flex-col items-center text-center gap-4">
            <h3 className='text-xl md:text-3xl font-medium text-[#373737]'>Subscribe now & get 20% off</h3>
            <p className='text-[#9A9A9A] text-sm md:text-lg' >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

            <form className='max-w-2xl w-full relative mt-4' onSubmit={handleSubmit} >
                <input 
                   type="text" 
                   placeholder='Enter your e-mail id' 
                   value={subInput}
                   onChange={handleInput}
                   className='h-full w-full p-2 md:p-4 border border-gray-300 outline-0' 
                />
                <button className='cursor-pointer absolute right-0 top-0 bottom-0 px-2 md:px-8 text-center bg-black text-white uppercase text-xs md:text-base'>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default Subscribe