import { TokenExpiredError, sign, verify } from 'jsonwebtoken';
import { TokenPayload } from '@/configs/interfaces';
import Resp from '@/utils/resp';

export const createToken = (payload: TokenPayload) => {
    console.log(process.env.ACCESS_TOKEN_EXPIRES)
    return sign(
        {payload},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d",
            algorithm: 'HS256'
        }
    )
}


export const verifyToken = (token: string, isRefresh: boolean = false) => {
    let secret : string;

    if (isRefresh) {
        secret = process.env.REFRESH_TOKEN_SECRET!
    } else {
        secret = process.env.ACCESS_TOKEN_SECRET!
    }
    
    try {
        const decoded = verify(token, secret);
        return decoded
    }
    catch(err) {
        if (err instanceof TokenExpiredError) {
            console.log('expired')
            return null
        }
        else {
            return null
        }
    }   
}