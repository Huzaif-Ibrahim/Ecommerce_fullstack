import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import connectToDb from './config/mongoose.js'
import connectCloudinary from './config/cloudinary.js'

import userRoutes from './routes/userRoute.js'
import productRoute from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "https://ecommerce-server-sigma-jade.vercel.app",
  credentials: true
}));

// CONFIGS
connectToDb(`${process.env.MONGO_URI}/e-commerce`)
connectCloudinary()

// ROUTES
app.use('/api/user', userRoutes)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

app.get('/', (req,res) => {
    res.send('App is running')
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`App is running on the port ${process.env.PORT || 4000}`)
})