import { Router } from "express";
import { genUser, upgradeUser } from "@/app/admin/user";

const router: Router = Router();

router.post('/create', genUser);
router.post('/upgrade', upgradeUser)

export default router;