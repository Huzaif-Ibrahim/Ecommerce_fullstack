import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductCard from './ProductCard'

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext)

    const [relatedProducts, setRelatedProducts] = useState([])

    const filterRelatedProducts = () => {
        let producstCopy = products.slice()

        const filteredProducts = producstCopy.filter(item => item.category === category && item.subCategory === subCategory)

        setRelatedProducts(filteredProducts.slice(0,5))
    }

    useEffect(() => {
        filterRelatedProducts()
    },[products, category, subCategory])

  return (
    <div>
        <div className='text-2xl md:text-4xl text-center'>
            <Title title1={'Related'} title2={'Products'} />
        </div>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-4'>
            {
                relatedProducts.map((item, indx) => {
                    return <ProductCard key={indx} id={item._id} imgSrc={item.image[0]} productTitle={item.name} productPrice={item.price} />
                })
                
            }
        </div>
    </div>
  )
}

export default RelatedProducts