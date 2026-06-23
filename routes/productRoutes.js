import express from 'express';
import { addProduct, deleteProduct, getAllProduct, updateProduct, getSingleProduct } from '../controllers/productController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js';
import { multipleUpload } from '../middleware/multer.js';

const router = express.Router();

// Sahi sequence: Authentication -> Admin Check -> Multer (Files) -> Controller
router.post('/add', isAuthenticated, isAdmin, multipleUpload, addProduct);
router.get('/getAllProducts', getAllProduct);
router.get('/:productId', getSingleProduct);
router.put('/update/:productId', isAuthenticated, isAdmin, multipleUpload, updateProduct);
router.delete('/delete/:productId', isAuthenticated, isAdmin, multipleUpload, deleteProduct,);

export default router;