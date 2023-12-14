import { Router } from "express";
import userRouter from './user'

const router: Router = Router();

router.post('/user', userRouter);

export default router;