import Category from "../models/Category.js";
import Product from "../models/Product.js";
import slugify from "slugify";

export const getCategory = async (req, res, next) => {
    try {
        const data = await Category.find({});
        if (data) {
            res.status(200).json({
                success: true,
                message: "Lấy danh mục thành công!",
                data,
            });
        }
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Lấy danh mục thất bại!",
            error: error.message,
        });
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const data = await Category.findById(req.params.id).populate("products", "title");
        if (data) {
            res.status(200).json({
                success: true,
                message: "Lấy danh mục thành công!",
                data,
            });
        }
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Lấy danh mục thất bại!",
            error: error.message,
        });
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const slug = slugify(req.body.title, {
            replacement: "-", // Chuyển dấu cách thành -
            lower: true, // Chuyển toàn bộ ký tự thành chữ thường
            strict: true, // Loại bỏ các ký tự không hợp lệ
            locale: true, // Hỗ trợ định dạng địa phương 
            trim: true // Loại bỏ các ký tự khoảng trắng ở đầu và cuối
        });
        const data = await Category.create({ ...req.body, slug });
        if (data) {
            res.status(201).json({
                success: true,
                message: "Thêm danh mục thành công!",
                data: data,
            });
        }
    } catch (error) {
        
            next({
                status: 500,
                success: false,
                message: "Thêm danh mục thất bại!",
                error: error.message,
            });
        }
};

export const editCategory = async (req, res, next) => {
    try {
        const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
       
        if (data) {
            res.status(200).json({
                success: true,
                message: "Cập nhật danh mục thành công!",
                data,
            });
        }
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Cập nhật danh mục thất bại!",
            error: error.message,
        });
    }
};

export const removeCategory = async (req, res, next) => {
    try {
        if (req.params.id === "669c02529765efdfc6352752") {
            return next({
                status: 400,
                success: false,
                message: "Không xóa được danh mục mặc định!"
            });
        }
        const data = await Category.findByIdAndDelete(req.params.id);
        const productsToUpdate = await Product.find({ category: req.params.id });
        await Promise.all(
            productsToUpdate.map(async (product) => {
                product.category = "669c02529765efdfc6352752";
                await product.save();
            })
        );
       if (data) {
         res.status(200).json({
             success: true,
             message: "Xóa danh mục thành công!",
         });
       }
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Xóa danh mục thất bại!",
            error: error.message,
        });
    }
};
