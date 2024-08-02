import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: 'dikgwwjw9',
    api_key: '678915593627964',
    api_secret: 'SZQNIEXtqXrls0o52chkvqo2uhk'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'daddyGiao',
        allowed_formats: ['jpg', 'png']
    }
});

const upload = multer({ storage });

export { cloudinary, storage, upload };