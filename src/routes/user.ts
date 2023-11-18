import { delUser, getUsers, viewUser } from "@/app/user";
import { Router } from "express";

const router: Router = Router();

router.get('/', getUsers);
router.delete('/', delUser);
router.get('/:userId', viewUser);

export default router;