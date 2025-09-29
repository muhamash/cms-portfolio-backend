import { StatusCodes } from "http-status-codes";
import { myPrisma } from "../../../config/db/getPrisma";
import { asyncHandler, responseFunction } from "../../utils/controller.util";

export const homeRoute = asyncHandler( async ( req, res, next ) => 
{
    const users = await myPrisma.user.findMany( {
        select: {
            id: true,
            email: true,
            name: true,
        },
    } );
    
    responseFunction( res, {
        message: `This is the home route! Service is running!`,
        statusCode: StatusCodes.OK,
        data: users
    } )
} );