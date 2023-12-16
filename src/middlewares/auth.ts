import { verifyToken } from '@/lib/tokens';
import { NextFunction, Request, Response } from 'express';



/**
 * Middleware for handling authorization checks based on bearer token authentication.
 *
 * This middleware extracts the bearer token from the 'Authorization' header of an incoming
 * HTTP request, verifies its validity, and attaches the decoded payload to the response's
 * local context if successful. If the token is missing or invalid, appropriate HTTP responses
 * are sent to indicate the error.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 *
 * @returns {void} - The middleware either calls the 'next' function to proceed with the
 *                  next middleware or sends an appropriate HTTP response if an error occurs.
 *
 * @throws {Error} - If there's an issue with the token verification process.
 *
 */
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


/**
 * Admin Authorization Middleware
 *
 * This middleware function is designed to enforce access control based on user roles in a secure application.
 * It verifies the authenticity of a JWT (JSON Web Token) extracted from the 'Authorization' header and ensures that
 * the authenticated user possesses the necessary administrative privileges.
 *
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @param {NextFunction} next - Express NextFunction to pass control to the next middleware or route handler
 *
 * @returns {Promise<void>} - Resolves with the authenticated user's payload attached to res.locals if the user has
 * sufficient administrative privileges. Otherwise, sends an appropriate error response indicating the lack of
 * authorization.
 *
 * @throws {Error} - Throws an error if there is an issue with the Authorization headers, if the Bearer token is missing,
 * if the token validation process fails, or if the user lacks the required administrative roles.
 **/
export const adminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
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
    
    if ( !['ADMIN', 'SUPER_ADMIN'].includes(data.payload.userRole)) {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }
    res.locals.payload = data;
    next();
}