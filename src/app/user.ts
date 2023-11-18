import { createUser, getUser, allUsers } from "@/repositories/user";
import { Request, Response } from "express";


export const getUsers = async (req: Request, res: Response) => {
    const users = await allUsers()
    console.log('users', users);

    res.status(200).json({
        message: 'Fetched users',
        users: users
    })
}



export const delUser = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Delete a user'
    })
}

export const viewUser = (req: Request, res: Response) => {
    const id: string = req.params.userId;
    const user = getUser(id);

    res.status(200).json({
        message: "User found",
        user: user
    })
}