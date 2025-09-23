import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ShopContext = createContext()

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const ShopContextProvider = ({ children }) => {

    const currency = '₹'
    const delivary_fee = 49

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(false)

    const [token, setToken] = useState('')


    const navigate = useNavigate()

    const fetchProducts = async () => {
        setProductsLoading(true)
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setProductsLoading(false)
    }

    const cartNumber = () => {
        let totalCount = 0
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item] > 0){
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const addToCart = async (itemId, itemSize) => {
        let cartCopy = structuredClone(cartItem)

        if(!itemSize){
            toast.error('Pleae select a size')
            return
        }

        if(cartCopy[itemId]){
            if (cartCopy[itemId][itemSize]) {
                cartCopy[itemId][itemSize] += 1
            } else {
                cartCopy[itemId][itemSize] = 1
            }
        } else {
            cartCopy[itemId] = {}
            cartCopy[itemId][itemSize] = 1
        }
        toast.success('Item added to cart')
        setCartItem(cartCopy)

        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size: itemSize }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const updateCartQuantity = async (itemId, itemSize, quantity) => {
        let cartCopy = structuredClone(cartItem)
        cartCopy[itemId][itemSize] = quantity
        setCartItem(cartCopy)

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size: itemSize, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async (token) => {
        if(token){
            try {
                const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: {token}})
                
                if(response.data.success){
                    setCartItem(response.data.cartData)
                }else{
                    toast.error('Error while adding to cart.')
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const subTotal = () => {
        let price = 0

        for(const items in cartItem){
            for(const item in cartItem[items]){
                if (cartItem[items][item] > 0) {
                    price += (cartItem[items][item] * products.find(e => e._id === items).price)
                }
            }
        }

        return price
    }

    useEffect(() => {
        fetchProducts()
    },[])

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const values = {
        products,
        currency,
        delivary_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        setCartItem,
        addToCart,
        cartNumber,
        updateCartQuantity,
        subTotal,
        navigate,
        productsLoading,
        token,
        setToken
    }

    return (
    <ShopContext.Provider value={values}>
        { children }
    </ShopContext.Provider>
    )
}

export default ShopContextProvider