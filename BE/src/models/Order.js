import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth'},
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
    }],
    totalPrice: { type: Number, required: true },
    shippingDetails: {
        name: { type: String },
        address: { type: String },
        phone: { type: String  },
    },
    orderStatus: { type: String, enum: ['Chờ xử lý', 'Đang xử lý', 'Đã gửi hàng', 'Đã giao hàng'], default: 'Chờ xử lý' },
    paymentMethod:String,

    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default model('Order', orderSchema);
