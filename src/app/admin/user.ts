import { Request, Response } from "express"

export const genUser = (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'You are an admin'
    })
}