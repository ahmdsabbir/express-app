import { getUser, allUsers, removeUser } from "@/repositories/user";
import { Request, Response } from "express";


export const getUsers = async (req: Request, res: Response) => {
    const { page, pageSize } = req.body;

    const users = await allUsers(page, pageSize);

    res.status(200).json({
        message: `Fetched ${users.length} users`,
        users: users
    })
}


export const delUser = (req: Request, res: Response) => {
    try {
        removeUser(req.params.userId)
        res.status(200).json({
            message: `User deleted`
        })
    }
    catch(err) {
        res.status(400).json({
            message: `Could not delete: ${err}`
        })
    }
}

export const viewUser = async (req: Request, res: Response) => {
    const id: string = req.params.userId;
    const user = await getUser(id);

    res.status(200).json({
        message: "User found",
        user: user
    })
}