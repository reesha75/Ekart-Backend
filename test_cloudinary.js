import 'dotenv/config';
import {v2 as cloudinary} from 'cloudinary';

console.log("CLOUD_NAME:", JSON.stringify(process.env.CLOUD_NAME));
console.log("API_KEY:", JSON.stringify(process.env.API_KEY));
console.log("API_SECRET:", JSON.stringify(process.env.API_SECRET));
console.log("CLOUDINARY_URL present:", !!process.env.CLOUDINARY_URL);

if (process.env.CLOUDINARY_URL) {
  // Configured automatically
} else {
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });
}

async function run() {
  try {
    const res = await cloudinary.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", {
      folder: "ecommerce_products"
    });
    console.log("SUCCESS:", res);
  } catch (err) {
    console.error("ERROR:", err);
  }
}
run();
