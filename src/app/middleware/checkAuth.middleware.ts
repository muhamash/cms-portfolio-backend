import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envStrings } from "../../config/env.config";
import { AppError } from "../../config/errors/App.error";


declare global {
  namespace Express {
    interface Request {
        user?: JwtPayload & { id?: string; email?: string, name?: string };
    }
  }
}

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>
{
    try
    {
        // console.log(req.cookies, envStrings.AUTH_SECRET)
        const token =
            req.cookies[ "accessToken" ]
        
        // console.log(token,envStrings.AUTH_SECRET)

        if ( !token )
        {
            throw new AppError( httpStatus.UNAUTHORIZED, "No NextAuth session token found in cookies" );
        }

        // Decode/verify the JWT from NextAuth
        const decoded = jwt.verify(
            token,
            envStrings.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload;

        // console.log(decoded)

        req.user = decoded;

        next();
    } catch ( error: unknown )
    {
        if ( error instanceof jwt.TokenExpiredError )
        {
            next( new AppError( httpStatus.UNAUTHORIZED, "Session expired" ) );
        } else if ( error instanceof jwt.JsonWebTokenError )
        {
            next( new AppError( httpStatus.UNAUTHORIZED, "Invalid session token" ) );
        } else if ( error instanceof Error )
        {
            next( new AppError( httpStatus.UNAUTHORIZED, error.message ) );
        } else
        {
            next( new AppError( httpStatus.INTERNAL_SERVER_ERROR, "Unknown authentication error" ) );
        }
    }
};