import express from 'express'
import { loginUser, registerUser, adminLogin, checkAllUser, checkLogin } from '../controllers/userControllers.js'
import { userAuth } from '../middlewares/auth.js'

const userRoutes = express.Router()

userRoutes.post('/login', loginUser)
userRoutes.post('/register', registerUser)
userRoutes.post('/admin', adminLogin)
userRoutes.get('/all', checkAllUser)
userRoutes.post('/checklogin', userAuth, checkLogin)

export default userRoutes
