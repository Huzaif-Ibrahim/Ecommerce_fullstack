import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartControllers.js'
import { userAuth } from '../middlewares/auth.js'

const cartRoutes = express.Router()

cartRoutes.post('/get',userAuth, getUserCart)
cartRoutes.post('/add',userAuth, addToCart)
cartRoutes.post('/update',userAuth, updateCart)

export default cartRoutes