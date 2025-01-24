import { cloudinary } from "../helper/cloudinary.js";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({ status: 200, message: 'products fetched successfully', data: products });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}

export const addProduct = async (req, res) => {
    const { productName, productPrice, productDescription } = req.body;
    const productImage = req.file?.path;
    const productImageId = req.file?.filename;
    try {
        if (!productName || !productPrice || !productDescription || !productImage) {
            return res.status(400).send({ status: 400, message: 'All fields are required' });
        }
        const product = await Product.create({ productName, productPrice, productDescription, productImage, productImageId });
        res.status(201).send({ status: 201, message: 'product added successfully', data: product });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { productName, productPrice, productDescription } = req.body;
    const productId = req.params.id;
    let productImage, productImageId;

    // Check if a file is uploaded
    if (req.file) {
        productImage = req.file.path; // Image URL from Cloudinary
        productImageId = req.file.filename; // Image public ID from Cloudinary
    }

    try {
        // Validate if essential fields are present
        if (!productName || !productPrice || !productDescription || !productImage) {
            return res.status(400).send({ status: 400, message: 'All fields are required' });
        }

        // Update the product with new data
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, 
            { productName, productPrice, productDescription, productImage, productImageId },
            { new: true } // Get the updated product
        );

        // If the product was not found
        if (!updatedProduct) {
            return res.status(404).send({ status: 404, message: 'Product not found' });
        }

        res.status(200).send({
            status: 200,
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        // Find the product to delete
        const productToDelete = await Product.findById(productId);
        if (!productToDelete) {
            return res.status(404).send({ status: 404, message: 'Product not found'});
        }
        if(productToDelete.productImageId){
            await cloudinary.uploader.destroy(productToDelete.productImageId);
        }
        // Delete the product
        await Product.findByIdAndDelete(productId);
        res.status(200).send({ status: 200, message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
};