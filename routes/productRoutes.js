import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productControllers.js';
import {upload} from '../helper/cloudinary.js';

const productRoutes = express.Router();

productRoutes.get('/', getProducts);
productRoutes.post('/add',upload.single("productImage"), addProduct);
productRoutes.put('/update/:id',upload.single("productImage"), updateProduct);
productRoutes.delete('/delete/:id',deleteProduct)

// For multiple images
// productRoutes.post('/add',upload.fields([{name: "productImage", maxCount: 30},{name: pdf, maxCount: 5}]) , addProduct);


export default productRoutes;