import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
if (process.env.CLOUDINARY_URL) {
  // Cloudinary automatically configures itself when CLOUDINARY_URL is present
} else {
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });
}
export default cloudinary