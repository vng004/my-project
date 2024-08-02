import { Router } from "express";
import { getOrder, getOrderById, updateOrderStatus } from "../controllers/Order.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routeOrder = Router();

routeOrder.use(checkAuth);

routeOrder.get("/", getOrder);
routeOrder.get("/:id", getOrderById);
routeOrder.patch("/:id/status", updateOrderStatus);

export default routeOrder;
