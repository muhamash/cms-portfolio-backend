import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { ZodType } from "zod";
import { AppError } from "../../config/errors/App.error";

export const validateRequest = ( zodSchema: ZodType ) => async (
    req: Request,
    res: Response,
    next: NextFunction
) =>
{
    try
    {
        if ( !req.body )
        {
            throw new AppError(httpStatus.CONFLICT, "Request body is absent!!!")    
        }

        // console.log(req.body);
        req.body = await zodSchema.parseAsync( req.body );
        next();
    } catch ( error: unknown )
    {
        next( error );
    }
};