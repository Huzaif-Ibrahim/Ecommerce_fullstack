import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const [loading, setLoading] = useState(false)

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const forlgata = new Forlgata()
      forlgata.append('name', name)
      forlgata.append('description', description)
      forlgata.append('price', price)
      forlgata.append('category', category)
      forlgata.append('subCategory', subCategory)
      forlgata.append('bestseller', bestseller)
      forlgata.append('sizes', JSON.stringify(sizes))
      image1 && forlgata.append('image1', image1)
      image2 && forlgata.append('image2', image2)
      image3 && forlgata.append('image3', image3)
      image4 && forlgata.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', forlgata, { headers: { token: token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        // setDescription('')
        setPrice('')
        setCategory('Men')
        setSubCategory('Topwear')
        setBestseller(false)
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setLoading(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)

    }
  }

  return (
    <div className='p-4 pb-16 lg:pb-0 lg:p-12 bg-gray-50 w-full'>
      <form onSubmit={(e) => submitHandler(e)} className='flex flex-col gap-4 max-w-2xl'>
        {/* Upload Image */}
        <div className='flex flex-col gap-1 lg:gap-2'>
          <p className='text-gray-700 text-lg'>Upload Image</p>
          <div className='flex lg:flex-row flex-col gap-2 lg:items-center'>
            <label htmlFor="image1">
              <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className='h-24' />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='h-24' />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className='h-24' />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className='h-24' />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1 lg:gap-2'>
          <p className='text-gray-700 text-lg'>Product name</p>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='p-2' placeholder='Type here' />
        </div>

        <div className='flex flex-col gap-1 lg:gap-2'>
          <p className='text-gray-700 text-lg'>Product description</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='p-2' placeholder='Write content here' ></textarea>
        </div>

        <div className='flex flex-col lg:flex-row gap-4 lg:gap-8'>
          <div className='flex flex-col gap-1 lg:gap-2'>
            <p className='text-gray-700 text-lg'>Product category</p>
            <select onChange={(e) => setCategory(e.target.value)} className='p-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className='flex flex-col gap-1 lg:gap-2'>
            <p className='text-gray-700 text-lg'>Product category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className='p-2'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className='flex flex-col gap-1 lg:gap-2'>
            <p className='text-gray-700 text-lg'>Product price</p>
            <input onChange={(e) => setPrice(e.target.value)} type="number" className='p-2' placeholder='Type here' />
          </div>
        </div>

        <div className='flex flex-col gap-1 lg:gap-2'>
          <p className='text-gray-700 text-lg'>Product Sizes</p>
          <div className='flex items-center gap-1 lg:gap-2'>
            <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])} className={`border cursor-pointer ${sizes.includes("S") ? 'bg-[#ffebf5] border-[#c586a5] text-[#c586a5]' : 'bg-gray-300 text-gray-400 border-0'} h-10 w-10 flex items-center justify-center`}><p className=' text-base'>S</p></div>
            <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])} className={`border cursor-pointer ${sizes.includes("M") ? 'bg-[#ffebf5] border-[#c586a5] text-[#c586a5]' : 'bg-gray-300 text-gray-400 border-0'} h-10 w-10 flex items-center justify-center`}><p className='text-base'>M</p></div>
            <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])} className={`border cursor-pointer ${sizes.includes("L") ? 'bg-[#ffebf5] border-[#c586a5] text-[#c586a5]' : 'bg-gray-300 text-gray-400 border-0'} h-10 w-10 flex items-center justify-center`}><p className=' text-base'>L</p></div>
            <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])} className={`border cursor-pointer ${sizes.includes("XL") ? 'bg-[#ffebf5] border-[#c586a5] text-[#c586a5]' : 'bg-gray-300 text-gray-400 border-0'} h-10 w-10 flex items-center justify-center`}><p className='text-base'>XL</p></div>
            <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])} className={`border cursor-pointer ${sizes.includes("XXL") ? 'bg-[#ffebf5] border-[#c586a5] text-[#c586a5]' : 'bg-gray-300 text-gray-400 border-0'} h-10 w-10 flex items-center justify-center`}><p className='text-base'>XXL</p></div>
          </div>
        </div>

        <div className='flex gap-1 lg:gap-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" />
          <p className='text-gray-700 text-lg'>Add to bestseller</p>
        </div>

        <button type="submit" className={`${loading ? "bg-gray-600" : " bg-black"}  text-white px-8 mt-4 py-2 w-fit flex items-center`}>
          <p>{loading ? <div className='bg-transparent h-4 w-4 border-t-2 border-gray-50 animate-spin rounded-full'></div> : 'ADD'}</p>
        </button>

      </form>
    </div>
  )
}

export default Add