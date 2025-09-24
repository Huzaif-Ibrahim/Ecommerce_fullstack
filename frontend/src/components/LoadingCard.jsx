import React from 'react'

const LoadingCard = () => {
    return (
        <div className='flex flex-col w-full gap-2 h-fit'>
            <div className='h-54 w-full bg-gray-400 animate-pulse'></div>
            <div className='h-4 w-full bg-gray-400 animate-pulse'></div>
            <div className='h-4 w-16 bg-gray-400 animate-pulse'></div>
        </div>
    )
}

export default LoadingCard