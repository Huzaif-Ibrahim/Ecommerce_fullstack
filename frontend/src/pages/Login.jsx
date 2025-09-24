import React, { useContext, useEffect, useState } from 'react'
import Subscribe from '../components/Subscribe'
import { backendUrl, ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginLoading, setLoginLoading] = useState(false)

  const { token, setToken, navigate } = useContext(ShopContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)
          setEmail('')
          setName('')
          setPassword('')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)
          setEmail('')
          setName('')
          setPassword('')
        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoginLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='py-16 md:py-32'>
      <form onSubmit={(e) => onSubmitHandler(e)} action="" className='flex flex-col gap-8 items-center w-full mb-40 md:mb-64'>
        <div className='flex items-center text-[#414141] gap-4'>
          <p className='prata-font text-4xl'>{currentState}</p>
          <p className='w-8 md:w-12 h-[1px] sm:h-[2px] bg-[#414141] border-0'></p>
        </div>

        <div className='flex flex-col gap-2 max-w-sm w-full'>
          {
            currentState === 'Sign Up' ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className={`p-2 outline-0 border border-black w-full`} required /> : null
          }
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='p-2 outline-0 border border-black w-full' required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='p-2 outline-0 border border-black w-full' required />
          <div className={`flex items-center text-sm justify-between text-[#3C3C3C]`}>
            <p className={`cursor-pointer hover:underline ${currentState === 'Login' ? 'visible' : 'hidden'}`}>Forgot your password?</p>
            {
              currentState === 'Login' ? <p className='cursor-pointer hover:underline' onClick={() => setCurrentState('Sign Up')}>Create account</p> : <p className='cursor-pointer hover:underline' onClick={() => setCurrentState('Login')}>Login here</p>
            }
          </div>
        </div>

        <button className='bg-black text-white py-2 px-6 outline-0 cursor-pointer'>
          {
            loginLoading ? (
              <div className='flex gap-1 items-center'>
                
                <p>{currentState === 'Sign Up' ? 'Creating' : 'Logging In'}</p>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              currentState === 'Sign Up' ? 'Create' : 'Log In'
            )}

        </button>
      </form>

      <Subscribe />
    </div>
  )
}

export default Login