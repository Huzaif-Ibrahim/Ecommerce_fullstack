import React, { useContext, useEffect, useState } from 'react'
import { backendUrl, ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Profile = () => {

    const { token, navigate, setToken, setCartItem } = useContext(ShopContext)

    const [userData, setuserData] = useState({})
    const [profileLoading, setProfileLoading] = useState(false)

    const fetchUserData = async () => {
        setProfileLoading(true)
        try {
            const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } })
            if (response.data.success) {
                setuserData(response.data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setProfileLoading(false)
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItem({})
        navigate('/login')
        toast.success('Logged out successfully.')
    }

    useEffect(() => {
        fetchUserData()
    }, [token])

    return (
        <div className='my-10 lg:my-12 min-h-[80vh]'>
            <div className='flex items-center justify-between pb-10 lg:pb-12 border-b border-gray-400'>
                <div className='flex items-center justify-center gap-4'>
                    {
                        profileLoading ? <div className='h-20 w-20 rounded-full bg-gray-400 animate-pulse' ></div> : <img src={assets.default_user} className='h-20 w-20 rounded-full' alt="" />
                    }

                    {
                    profileLoading ? <div className='flex flex-col gap-2 items-start justify-center'>
                        <div className='h-3 w-12 bg-gray-400 animate-pulse'></div>
                        <div className='h-3 w-24 bg-gray-400 animate-pulse'></div>
                    </div> : 
                    <div className='flex flex-col items-start justify-center'>
                        <p className='text-lg'>{userData.name}</p>
                        <p>{userData.email}</p>
                    </div>
                    }
                </div>

                <div className='text-right px-2 py-1 bg-red-50 hover:bg-red-200 transition-all duration-300 rounded-lg'>
                    <p className='text-red-600 cursor-pointer' onClick={logout}>Logout</p>
                </div>
            </div>

            <div className='py-4 lg:py-8 border-b border-gray-400 cursor-pointer'>
                <p onClick={() => navigate('/orders')}>Orders</p>
            </div>
            <div className='py-4 lg:py-8 border-b border-gray-400 cursor-pointer'>
                <p onClick={() => navigate('/')}>Return to home page</p>
            </div>
        </div>
    )
}

export default Profile