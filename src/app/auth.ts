import { createUser, loginUser } from "@/repositories/user";
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

export const userLogin = async (req: Request, res: Response) => {
    const credential: string = req.body.credential;
    const password: string = req.body.password;

    console.log(credential, password)

    const isVerified = await loginUser(credential, password);
    return res.status(200).json({
        message: 'User found',
        user: isVerified
    })
}