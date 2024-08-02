import { Router } from "express";
import {
  createCategory,
  editCategory,
  getCategory,
  getCategoryById,
  removeCategory,
} from "../controllers/category.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";


const routeCategory = Router();

routeCategory.get("/", getCategory),
  routeCategory.get("/:id", getCategoryById),
//   routeCategory.use(checkAuth, checkIsAdmin);
routeCategory.post("/", createCategory),
  routeCategory.patch("/:id", editCategory),
  routeCategory.delete("/:id", removeCategory);
export default routeCategory;
