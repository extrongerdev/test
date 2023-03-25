import { Router } from "express";
import {
    listAll
} from "../controllers/user.controllers.js";

import { verifyToken } from "./validate-token.js";

const router = Router();

router.get("/users", verifyToken, listAll);

export default router;