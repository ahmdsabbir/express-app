import { sign } from 'jsonwebtoken';
import { TokenPayload } from '@/configs/interfaces';

export const createToken = (payload: TokenPayload) => {
    return sign(
        {payload},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 10,
            algorithm: 'HS256'
        }
    )
}