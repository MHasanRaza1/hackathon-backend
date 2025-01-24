import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARYNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = "uploads";
        if (file.mimetype === "application/pdf") {
            folder = "uploads/pdf";
        } else {
            folder = "uploads/images";
        }

        return {
            folder: folder,
            allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        };
    },
});

const upload = multer({ storage });

export {upload, cloudinary};
