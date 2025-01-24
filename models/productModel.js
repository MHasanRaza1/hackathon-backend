import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productImageId:{
        type: String,
    }
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;