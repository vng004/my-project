import { Router } from 'express';
import { uploadImage } from '../controllers/image.js';
import { upload } from '../middlewares/upload.js';

const routeImage = Router();

routeImage.post('/upload', upload.single('image'), uploadImage);

export default routeImage;
