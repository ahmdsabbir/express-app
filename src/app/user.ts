import { Request, Response } from "express";


export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Get all users'
    })
}

export const addUser = (req: Request, res: Response) => {
    res.status(201).json({
        message: 'Add a user'
    })
}

export const delUser = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Delete a user'
    })
}

export const viewUser = (req: Request, res: Response) => {
    res.status(200).json({
        message: `View the user with id: ${req.params.userId}`
    })
}