import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { createProjectService, getProjectByIdService } from "./project.service";



export const createProject = asyncHandler( async ( req: Request, res: Response ) =>
{
    // console.log(req.body)
    const project = await createProjectService( req.body )
    
    if ( !project )
    {
        throw new AppError(httpStatus.BAD_REQUEST, "Unable to create the project")
    }

    responseFunction( res, {
        message: "Created a project",
        statusCode: httpStatus.CREATED,
        data: project
    })
} )

export const getProjectById = asyncHandler( async ( req: Request, res: Response ) =>
{
    const id = req.params.id

    if ( !id )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Id not provided!!")
    }

    const getProject = await getProjectByIdService( id );

    responseFunction( res, {
        message: "Found the target!",
        statusCode: httpStatus.OK,
        data: getProject
    })
})