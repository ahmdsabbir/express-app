import { verifyToken } from '@/lib/tokens';
import { NextFunction, Request, Response } from 'express';


export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers['authorization']

    if (!authToken) {
        return res.status(401).json({
            message: 'Missing Authorization headers'
        })
    }

    let token: string;

    if (!authToken.startsWith('Bearer ')) {
        return res.status(400).json({
            message: 'Missing valid Bearer token'
        })
    }
    else {
        token = authToken.split(' ')[1];
    }
    const data = await verifyToken(token);

    if (data == null) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

    res.locals.payload = data;
    next();
}

export const adminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers['authorization']
    const token = authToken.split(' ')[1];
    const data = await verifyToken(token);
    console.log(data);
}