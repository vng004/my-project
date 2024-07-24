import { Router } from "express";
import { createProduct, editProduct, getProductById, getProducts, removeProduct } from "../controllers/product.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import productSchema from "../validation/productSchema.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const routeProduct = Router()

    routeProduct.get("/", getProducts),
    routeProduct.get("/:id", getProductById),

    routeProduct.use("/", checkAuth, checkIsAdmin)

    routeProduct.delete("/:id", removeProduct),
    routeProduct.post("/", validBodyRequest(productSchema), createProduct),
    routeProduct.patch("/:id", editProduct)

export default routeProduct