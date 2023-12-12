import { Router } from "express";
import { addUser, userLogin } from "@/app/auth";

const router: Router = Router();

router.post('/register', addUser);
router.post('/login', userLogin);

export default router;