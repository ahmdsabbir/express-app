import { Router } from "express";
import userRouter from './user'
import { adminAuthorization } from "@/middlewares/auth";

const router: Router = Router();

router.use('/user', adminAuthorization, userRouter);

export default router;