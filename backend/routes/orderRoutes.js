import express from 'express'
import { placeOrder, placeOrderRazorpay, allOrders, updateStatus, userOrders, verifyRazorpay, deleteCancelledOrder } from '../controllers/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import { userAuth } from '../middlewares/auth.js'

const orderRoutes = express.Router()

// Admin features
orderRoutes.post('/list', adminAuth, allOrders)
orderRoutes.post('/status', adminAuth, updateStatus)

// For all
orderRoutes.post('/delete-order', deleteCancelledOrder)

// Patment features
orderRoutes.post('/place', userAuth, placeOrder)
orderRoutes.post('/razorpay', userAuth, placeOrderRazorpay)

// User features
orderRoutes.post('/userorders', userAuth, userOrders)

// Verify Razorpay
orderRoutes.post('/verifyRazorpay', userAuth, verifyRazorpay)

export default orderRoutes