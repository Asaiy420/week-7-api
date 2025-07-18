import express, { Router } from "express";
import { Login, Register } from "../controllers/user.controller.js";


const router = Router();

router.post("/register", Register);
router.post("/login", Login);

export default router;