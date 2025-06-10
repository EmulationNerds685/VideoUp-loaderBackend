import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'video',
    eager_async: true, // ✅ tells Cloudinary to process in background
    eager: [
      { width: 720, height: 480, crop: 'pad' }, // optional transformation
    ],
  },
});


export { cloudinary, storage };
