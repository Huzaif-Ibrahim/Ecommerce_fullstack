import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductCard from './ProductCard'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)

    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0,10))
    }, [products])

  return (
    <div className='my-10'>
        <div className='py-8 text-center text-2xl md:text-4xl '>
            <Title title1={'latest'} title2={'collections'} />
            <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base font-normal text-[#868686]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 md:px-16'>
            {
                latestProducts.map((e, indx) => {
                    return <ProductCard key={indx} id={e._id} productPrice={e.price} productTitle={e.name} imgSrc={e.image[0]} />
                })
            }
        </div>
    </div>
  )
}

export default LatestCollection