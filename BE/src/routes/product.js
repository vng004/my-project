import { Router } from "express";
import { createProduct, editProduct, getList, getProductById, getProductsByCategory, removeProduct } from "../controllers/product.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import productSchema from "../validation/productSchema.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const routeProduct = Router()

    routeProduct.get("/", getList),
    routeProduct.get("/:id", getProductById),
    routeProduct.get("/category/:id", getProductsByCategory),

    routeProduct.use("/", checkAuth, checkIsAdmin)

    routeProduct.delete("/:id", removeProduct),
    routeProduct.post("/", validBodyRequest(productSchema), createProduct),
    routeProduct.patch("/:id", editProduct)

export default routeProduct