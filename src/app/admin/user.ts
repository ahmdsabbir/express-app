import { createUserFromAdmin, getUser, setAdmin } from "@/repositories/user"
import { Request, Response } from "express"

export const genUser = async (req: Request, res: Response) => {
    const { username, email, password, role, status, isVerified } = req.body
    try {
        await createUserFromAdmin(
            username,
            password,
            email,
            role,
            status,
            isVerified
        )
    }
    catch(err) {
        return res.status(400).json({
            message: `Could not create: ${err}`
        })
    }
    return res.status(200).json({
        message: 'New Verified user created'
    })
}

export const upgradeUser = async (req: Request, res: Response) => {
    const id = req.body.id;
    const user = await getUser(id);

    if (!user) {
        return res.status(400).json({
            message: 'User doesn\'t exist!'
        })
    }

    try {
        await setAdmin(id);
        return res.status(200).json({
            message: `Upgraded user ${user.username} to and admin`
        })
    }
    catch(err) {
        return res.status(400).json({
            message: `Could not upgrade user to admin: ${err}`
        })
    }
}