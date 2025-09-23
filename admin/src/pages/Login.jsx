import React, { useState } from 'react'
import { backendUrl } from '../App' 
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if(response.data.success){
                setToken(response.data.token)
                toast.success(response.data.message)
            } else{
                toast.error(response.data.message)
            }
            setEmail('')
            setPassword('')
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
        <form onSubmit={(e) => submitHandler(e)} className='rounded-lg w-xs shadow-2xl p-6 flex flex-col gap-4 items-start bg-white' action="">
            <h2 className='text-gray-900 text-3xl font-bold'>Admin Panel</h2>

            <div className='flex flex-col gap-1 w-full'>
                <p>Email Adress</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='w-full p-2 rounded-md outline-0 border border-gray-400' placeholder='your@email.com' required />
            </div>

            <div className='flex flex-col gap-1 w-full'>
                <p>Password</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="passsword" className='p-2 w-full rounded-md outline-0 border border-gray-400' placeholder='Enter password' required />
            </div>

            <button type="submit" className='cursor-pointer w-full rounded-md text-white bg-black py-2' >Login</button>
        </form>
    </div>
  )
}

export default Login