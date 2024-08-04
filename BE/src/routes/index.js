import routerAuth from "./auth.js";
import routeCart from "./cart.js";
import routeCategory from "./category.js";
import routeOrder from "./order.js";
import routeProduct from "./product.js";
import routeImage from "./upload.js";

export function router(app) {
    app.use("/api/products", routeProduct)
    app.use("/api/categories", routeCategory)
    app.use("/api/auth", routerAuth)
    app.use("/api/images", routeImage)
    app.use("/api/cart", routeCart)
    app.use("/api/orders", routeOrder)
}