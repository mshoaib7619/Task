import { Router} from "express";
import {signup, login, logout, sessionVerify} from "../controllers/auth";
const router = Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.get("/session", sessionVerify)

export default router;