import { delUser, getUsers, viewUser } from "@/app/client/user";
import { authorization } from "@/middlewares/auth";
import { Router } from "express";

const router: Router = Router();

router.get('/', authorization, getUsers);
router.delete('/:userId', delUser);
router.get('/:userId', viewUser);

export default router;