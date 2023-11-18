import { createUser } from "@/repositories/user";
import { Request, Response } from "express";

export const addUser = async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const role: string = req.body.role;

    try{
        await createUser(username, password, email, role);
        res.status(201).json({
            message: 'New User Created'
        })
    }
    catch(err) {
        res.status(400).json({
            message: 'Could not add user'
        })
    }
}