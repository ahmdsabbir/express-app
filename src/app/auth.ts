import { TokenPayload } from "@/configs/interfaces";
import { createToken } from "@/lib/tokens";
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
            message: `Could not add user: ${err}`
        })
    }
}

export const userLogin = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    
    const authState = await loginUser(email, password);
    let payload: TokenPayload;

    if (authState.state == false || authState.user == null) {
        return res.status(400).json({
            message: 'User is unauthorized',
            accesToken: null,
            refreshToken: null
        })
    }
    payload = {
        userId: authState.user.id,
        userRole: authState.user.role
    }

    const accessToken = createToken(payload);
    const refreshToken = createToken(payload)

    return res.status(200).json({
        message: 'User is authorized',
        accesToken: accessToken,
        refreshToken: refreshToken
    })

}