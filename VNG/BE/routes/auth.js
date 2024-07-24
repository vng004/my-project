import express from "express";
import { Login, Register } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import authSchema from "../validation/authShema.js";

const router = express.Router();

router.use(validBodyRequest(authSchema));
router.post("/register", Register);
router.post("/login", Login);

export default router;
