import { Router } from "express";
import { login, logout, register } from "../controllers/authController"
import { validateLogin, validateRegister } from "../validations/authValidation";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/login', validateLogin, login);

router.post('/register', validateRegister, register);   

router.post('/logout', authMiddleware, logout)


export default router;