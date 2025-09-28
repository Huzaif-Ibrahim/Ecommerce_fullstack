import orderModel from "../models/orderModel.js"
import userModel from "../models/userSchema.js"
import razorpay from 'razorpay'

const currency = 'inr'
const delivary_fee = 49

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})    

// Place order using COD
export const placeOrder = async (req, res) => {

    try {
        const { userId, items, address, amount } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({ success: true, message: 'Order Placed!' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Place order using Razorpay
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, address, amount } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if(error){
                console.log(error)
                return res.json({ success: false, messagge: error.message })
            }

            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment:true })
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: 'Payment Successfull' })
        } else {
            res.json({ success: false, message: 'Payment Failed' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// All orders for Admin panel
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: true, message: error.message })
    }
}

// Update status from adminpanel
export const updateStatus = async (req, res) => {
    
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: 'Status Updated.' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export const deleteCancelledOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await orderModel.findById(orderId)

        if(!order) return res.json({ success: false, message: 'Order not found.' })

        await orderModel.findByIdAndDelete(orderId)

        res.json({ success: true, message: 'Removed successfully.' })
    } catch (error) {
        res.json({ success: false, message:error.message })
    }
}


// Orders of perticular user
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error while fetching your orders.' })
    }
}