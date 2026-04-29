import { Router } from "express";
import { loginUser, logout } from "../../controller/user.ts";

const router = Router()

 router.post("/login",loginUser)
 router.delete("/logout",logout)


export default router