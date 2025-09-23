import ProductModel from "../models/productSchema.js"
import { v2 as cloudinary } from 'cloudinary'

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const newProduct = {
            name,
            description, 
            price : Number(price), 
            image : imagesUrl, 
            category, 
            subCategory, 
            sizes : JSON.parse(sizes), 
            bestseller : bestseller === 'true' ? true : false, 
            date : Date.now()
        }

        const product = new ProductModel(newProduct)
        await product.save()

        res.json({ success: true, message: 'Product Added!', product })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body
        if(!id) return res.json({ success : false, message : error.message })
        await ProductModel.findByIdAndDelete(id)
        res.json({ success : true, message : 'Product removed successfully.' })

    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await ProductModel.findOne({ _id : productId })

        res.json({ success : true, product })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const productsList = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.json({ success : true, products })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}