import { Router } from "express";
import {
    signup,
    signin
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/auth/signup", signup);

router.post("/auth/login", signin);

export default router;