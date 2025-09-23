import express from "express";
import { addProduct, removeProduct, singleProduct, productsList } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRoute = express.Router()

productRoute.post('/add', adminAuth, upload.fields([{ name:'image1', maxCount:1 }, { name:'image2', maxCount:1 }, { name:'image3', maxCount:1 }, { name:'image4', maxCount:1 }]) ,addProduct)
productRoute.post('/remove', adminAuth , removeProduct)
productRoute.post('/single', singleProduct)
productRoute.get('/list', productsList)


export default productRoute