import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductCard = ({ id, imgSrc, productTitle, productPrice }) => {

    const { currency } = useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className='flex flex-col gap-4 h-full text-[#494949] overflow-hidden font-medium'>
        <div className='w-full overflow-hidden'>
            <img src={imgSrc} className='w-full h-full hover:scale-110 transition ease-in-out duration-500' alt={productTitle} />
        </div>
        <div className='gap-2'>
            <p className='text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis'>{productTitle.slice(0,35)}</p>
            <p className='text-sm md:text-base'>{currency}{productPrice}</p>
        </div>
    </Link>
  )
}

export default ProductCard