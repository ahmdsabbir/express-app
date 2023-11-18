import { Router } from "express";
import { addUser } from "@/app/auth";

const router: Router = Router();

router.post('/register', addUser);

export default router;