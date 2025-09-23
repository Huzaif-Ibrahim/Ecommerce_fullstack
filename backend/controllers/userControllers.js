import userModel from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export const checkAllUser = async (req,res) => {
    const users = await userModel.find()
    return res.json({users})
}

export const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body
    
        if(!email || !password) return res.json({ success : false, message : 'Incomplete credientials' })
    
        const user = await userModel.findOne({ email })
    
        if(!user) return res.json({ success : false, message : 'No user found!' })
    
        const comparePassword = await bcrypt.compare(password, user.password)
    
        if(!comparePassword) return res.json({ success : false, message : 'Email or password is wrong!' })
    
        const token = createToken(user._id)
        res.json({ success : true, user, token, message : 'Logged in successfully!' })
        
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body
        const exist = await userModel.findOne({ email })

        if(exist) return res.json({ success : false, message : 'User already exists' })
        if(!validator.isEmail(email)) return res.json({ success : false, message : 'Please enter valid Email.'})
        if(password.length < 8){ 
            return res.json({ success : false, message : 'Password must be longer than 8 characters.'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success : true, message : 'User created successfully.', token })

    } catch (error) {
        console.log(error.message)
        res.json({ success : false, message : error.message })
    }
}

export const adminLogin = async (req,res) => {
    try {
        const { email, password } = req.body

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({ success : false, message : "Incorrect Email or password." })
        }

        const token = createToken(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
        res.json({ success : true, token, message : 'Admin loggedin successfully!' })

    } catch (error) {
        res.json({ success : false, message:error.message })
    }
}