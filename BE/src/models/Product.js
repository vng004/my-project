import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
    

const schemaProduct = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
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
schemaProduct.plugin(mongoosePaginate)
export default mongoose.model("Product", schemaProduct);