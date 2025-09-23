import express from 'express'
import { loginUser, registerUser, adminLogin, checkAllUser } from '../controllers/userControllers.js'

const userRoutes = express.Router()

userRoutes.post('/login', loginUser)
userRoutes.post('/register', registerUser)
userRoutes.post('/admin', adminLogin)
userRoutes.get('/all', checkAllUser)

export default userRoutes
