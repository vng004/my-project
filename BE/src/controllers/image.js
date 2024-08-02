import { cloudinary } from "../middlewares/upload.js";


export const uploadImage = async (req, res, next) => {
    try {
        const file = req.file; 

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Chưa tải lên tệp!"
            });
        }

        // Tải ảnh đơn lên Cloudinary
        const result = await cloudinary.uploader.upload(file.path);

        // Phản hồi với thông tin chi tiết của ảnh đã tải lên
        res.status(200).json({
            success: true,
            message: "Tải ảnh sản phẩm thành công!",
            data: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Tải ảnh sản phẩm thất bại!",
            error: error.message
        });
    }
}