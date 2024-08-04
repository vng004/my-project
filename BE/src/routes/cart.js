import { Router } from "express";
import { addToCart, checkout, getCart, removeFromCart } from "../controllers/cart.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routeCart = Router();


routeCart.get("/", getCart);

routeCart.post("/", addToCart);
routeCart.post("/checkout", checkout);
routeCart.delete("/:productId", removeFromCart);

export default routeCart;
