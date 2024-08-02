
import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
     
    },
    products:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }],
    isHidden: {
        type: Boolean,
        default: false,
    },
    slug: {
        type: String,
    },

},
    {
        timestamps: true,
        versionKey: false
    })
export default mongoose.model("Category", schema)