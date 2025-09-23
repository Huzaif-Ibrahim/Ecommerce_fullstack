import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import { assets } from '../assets/assets'

const Collection = () => {

  const { products, search, showSearch, productsLoading } = useContext(ShopContext)

  const [filteredProducts, setFilteredProducts] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice()

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilteredProducts(productCopy)
  }

  const sortProducts = () => {
    const fpcopy = filteredProducts.slice()

    switch(sortType){
      case 'low-high':
        setFilteredProducts(fpcopy.sort((a,b) => (a.price - b.price)))
        break

      case 'high-low':
        setFilteredProducts(fpcopy.sort((a,b) => (b.price - a.price)))
        break

      default:
        applyFilter()
         break
    }
  }

  useEffect(() => {
    sortProducts()
  },[sortType])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  return (
    <>
      <div className='min-h-screen flex flex-col lg:flex-row items-start gap-8 pb-16 lg:py-18'>

        <div className='min-w-60 flex flex-col gap-3 pt-6 lg:sticky top-0'>
          <p onClick={() => setShowFilter(!showFilter)} className='text-lg lg:text-2xl text-[#343434] flex items-center gap-3'>Filters
            <img src={assets.dropdown_icon} className={`h-3 transition-all duration-500 lg:hidden ${showFilter ? '-rotate-90' : 'rotate-90'}`} />
          </p>

          <div className={`lg:flex flex-col gap-3 ${showFilter ? 'flex' : 'hidden'}`}>
            <div className={`border border-gray-300 p-4 flex flex-col`}>
              <p className='text-[#212121] text-base mb-2'>Categories</p>

              <p className='flex text-[#272727] font-light text-sm gap-2'><input onChange={(e) => toggleCategory(e)} type="checkbox" value={'Men'} className='outline-0' /> Men</p>
              <p className='flex text-[#272727] font-light text-sm gap-2'><input onChange={(e) => toggleCategory(e)} type="checkbox" value={'Women'} className='outline-0' /> Women</p>
              <p className='flex text-[#272727] font-light text-sm gap-2'><input onChange={(e) => toggleCategory(e)} type="checkbox" value={'Kids'} className='outline-0' /> Kids</p>

            </div>

            <div className={`border border-gray-300 p-4 felx flex-col`}>
              <p className='text-[#212121] text-base mb-2'>TYPE</p>

              <p className='flex text-[#272727] font-light text-sm gap-2'><input onChange={(e) => toggleSubCategory(e)} type="checkbox" value={'Topwear'} className='outline-0' /> Topwear</p>
              <p className='flex text-[#272727] font-light text-sm gap-2'><input onChange={(e) => toggleSubCategory(e)} type="checkbox" value={'Bottomwear'} className='outline-0' /> Bottomwear</p>
              <p className='flex text-[#272727] font-light text-sm gap-2'><input onChange={(e) => toggleSubCategory(e)} type="checkbox" value={'Winterwear'} className='outline-0' /> Winterwear</p>

            </div>
          </div>
        </div>

        <div className='flex flex-col w-full'>

          <div className='flex flex-col text-2xl lg:text-4xl lg:flex-row justify-between items-center mb-12 lg:mb-4'>
            <Title title1={'ALL'} title2={'COLLECTIONS'} />
            <select onChange={(e) => setSortType(e.target.value)} className='text-base border border-gray-300 text-[#6A6A6A] py-2 px-4 outline-0'>
              <option value="relevant">Sort by : Most Relevant</option>
              <option value="low-high">Sort by : Low to High</option>
              <option value="high-low">Sort by : High to Low</option>
            </select>
          </div>

          <div className={`grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4`}>
            {
              productsLoading ? ([...Array(5)].map(_ => <div className='flex flex-col w-full gap-1 h-fit'>
                <div className='h-64 w-full bg-gray-400 animate-pulse'></div>
                <div className='h-8 w-2/3 bg-gray-400 animate-pulse'></div>
                <div className='h-8 w-3 bg-gray-400 animate-pulse'></div>

              </div>)) : filteredProducts.length > 0 ? filteredProducts.map((e, indx) => {
                return <ProductCard key={indx} id={e._id} imgSrc={e.image[0]} productPrice={e.price} productTitle={e.name} />
              }) : <p>SORRY🙁, No product Found...</p>
            }
          </div>


        </div>
      </div>
    </>
  )
}

export default Collection