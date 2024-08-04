import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Product from "../models/Product.js";

export const addToCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { productId, quantity, size } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [], totalPrice: 0 });
        }

        const productDetails = await Product.findById(productId);
        if (!productDetails) {
            return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
        }

        const productIndex = cart.products.findIndex(p => 
            p.product.toString() === productId && p.size === size
        );

        if (productIndex === -1) {
            cart.products.push({ product: productId, quantity, size });
        } else {
            cart.products[productIndex].quantity += quantity;
        }

        let totalPrice = 0;
        for (let item of cart.products) {
            const product = await Product.findById(item.product);
            totalPrice += product.price * item.quantity;
        }
        cart.totalPrice = totalPrice;

        await cart.save();

        return res.status(200).json({
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng",
        });
    }
};

export const getCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ userId }).populate("products.product", 'title price thumbnail category');
        if (!cart) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Giỏ hàng không tìm thấy."
            });
        }
        res.status(200).json(cart);
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Đã xảy ra lỗi khi lấy giỏ hàng."
        });
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tìm thấy" });
        }

        const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng" });
        }

        const product = cart.products[productIndex];
        const productDetails = await Product.findById(product.product);

        if (!productDetails) {
            return res.status(404).json({ message: "Chi tiết sản phẩm không tìm thấy" });
        }

        cart.totalPrice -= product.quantity * productDetails.price;
        cart.products.splice(productIndex, 1);

        await cart.save();

        return res.status(200).json({
            message: "Xóa sản phẩm khỏi giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        next({
            status: 500,
            success: false,
            message: "Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng",
        });
    }
};

export const checkout = async (req, res, next) => {
    try {
      const userId = req.userId; // Xác minh userId
      const { shippingDetails, paymentMethod } = req.body; // Đảm bảo nhận đầy đủ dữ liệu từ client
  
      const cart = await Cart.findOne({ userId }).populate("products.product" ,"user");
      if (!cart) return res.status(400).json({ message: "Giỏ hàng rỗng" });
  
      const order = new Order({
        user: userId,
        products: cart.products,
        totalPrice: cart.totalPrice,
        shippingDetails, // Gán trực tiếp
        paymentMethod // Gán phương thức thanh toán
      });
  
      await order.save();
  
      cart.products = [];
      cart.totalPrice = 0;
      await cart.save();
  
      return res.status(200).json({ message: "Thanh toán thành công", order });
    } catch (error) {
      next(error);
    }
  };
  
