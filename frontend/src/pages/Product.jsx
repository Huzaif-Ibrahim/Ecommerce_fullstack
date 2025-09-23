import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState(false)
  const [isDescription, setIsDescription] = useState(true)

  const dull_star = 5 - productData.rating

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
    window.scrollTo(0,0)
  }, [productId, products])

  return productData ? (
    <>
      <div className="pt-4 pb-10 md:py-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Showcase */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">

          {/* Image Section */}
          <div className="flex flex-col-reverse md:flex-row gap-4 md:w-1/2">

            {/* Thumbnails */}
            <div className="flex flex-row overflow-x-auto md:flex-col gap-3 md:w-1/5">
              {productData.image.map((item, indx) => (
                <img
                  src={item}
                  onClick={() => setImage(item)}
                  key={indx}
                  alt=""
                  className={`cursor-pointer ${image == item ? 'border' : ''} border-gray-600 transition w-20 h-20 object-cover md:w-full md:h-32`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <img
                src={image}
                alt=""
                className="h-full w-full object-contain shadow-sm"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-12 md:gap-0 justify-between md:w-1/2">
            <div className='flex flex-col gap-2 md:gap-4'>
              <h1 className="text-lg md:text-2xl font-medium text-[#3D3D3D]">{productData.name}</h1>
              <div className='flex gap-1 items-center'>
                {/* {
                  ([...Array(productData.rating)]).map((_,indx) => {
                    return <img src={assets.star_icon} key={indx} className='h-3' alt="star" />
                  })
                }
                {
                  dull_star > 0 ? ([...Array(dull_star)]).map((_,indx) => {
                    return <img src={assets.star_dull_icon} key={indx} className='h-3' alt="dull-star" />
                  }) : null
                } */}
                <img src={assets.star_icon} alt="" className='h-3'/>
                <img src={assets.star_icon} alt="" className='h-3'/>
                <img src={assets.star_icon} alt="" className='h-3'/>
                <img src={assets.star_icon} alt="" className='h-3'/>
                <img src={assets.star_dull_icon} alt="" className='h-3'/>
                <p className='pl-2 text-xs'>(122)</p>
              </div>
              <p className='text-3xl font-medium text-[#2A2A2A]'>{currency}{productData.price}</p>
              <p className="text-[#555555] text-sm md:text-lg w-4/5">
                {productData.description || "This is a premium product with amazing features."}
              </p>

              <div className='flex flex-col gap-2 md:gap-4 my-4'>
                <p className='text-[#656565] font-medium text-lg'>Select Size:</p>

                <div className='flex gap-2'>
                  {
                    productData.sizes.map((elem,indx) => {
                      return <button onClick={() => setSize(elem)} className={`cursor-pointer h-12 w-12 text-center border-2 ${elem === size ? 'border-[#FF8551] bg-[#ffe1d3]' : 'border-gray-100 bg-[#FBFBFB]'}`} key={indx}>{elem}</button>
                    })
                  }
                </div>
              </div>

              <button onClick={() => {
                addToCart(productData._id, size)
              }} className="cursor-pointer active:bg-gray-700 transition-all duration-300 w-fit px-8 py-3 bg-black text-white shadow">
                Add to Cart
              </button>
            </div>

            <div className='border-t border-gray-400 w-fit py-2 flex flex-col text-[#555555] text-sm gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>


        {/* Description and Reviews */}
        <div className='mt-20 md:mt-32'>
          <div className='flex font-bold text-sm'>
            <div onClick={() => setIsDescription(true)} className={`cursor-pointer ${isDescription ? ' bg-white text-[#393939]' : 'bg-[#FBFBFB] text-[#898989]'} px-6 py-3 border border-[#D0D0D0]`}>
              <p>Description</p>
            </div>
            <div onClick={() => setIsDescription(false)} className={`cursor-pointer ${!isDescription ? 'text-[#393939] bg-white' : 'bg-[#FBFBFB] text-[#898989]'} px-6 py-3 border border-[#D0D0D0]`}>
              <p >Reviews(22)</p>
            </div>
          </div>
          <div className='p-6 md:p-12 border border-[#D0D0D0] text-sm text-[#555555]'>
              {
                isDescription ? <div className='flex flex-col gap-4 '>
                  <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div> : <div></div>
              }
          </div>
        </div>

        <div className='my-20 md:my-32'>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>

      </div>

    </>
  ) : <div className='opacity-0'></div>
}

export default Product