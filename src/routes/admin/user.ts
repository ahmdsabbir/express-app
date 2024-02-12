import { Router } from "express";
import { genUser, upgradeUser, getUsers } from "@/app/admin/user";

const router: Router = Router();

router.post('/create', genUser);
router.post('/upgrade', upgradeUser);
router.post('/rel', getUsers);

export default router;