import { Router } from "express";

import authRouter from './auth';
import clientRouter from "./client";
import adminRouter from './admin'

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/client', clientRouter);
router.use('/admin', adminRouter);

export default router;