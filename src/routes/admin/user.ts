import { Router } from "express";
import { genUser } from "@/app/admin/user";

const router: Router = Router();

router.post('/create', genUser);

export default router;