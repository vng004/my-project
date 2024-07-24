import routeAuth from "./auth.js";
import routeCategory from "./category.js";
import routeProduct from "./product.js";

export function router(app) {
    app.use("/api/products", routeProduct)
    app.use("/api/categories", routeCategory)
    app.use("/api/auth", routeAuth)
}