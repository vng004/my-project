import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        ref: "Category",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stock: Number
},
    {
        timestamps: true,
        versionKey: false
    });

export default mongoose.model("Product", schema);
