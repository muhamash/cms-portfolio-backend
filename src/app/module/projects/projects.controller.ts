import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { createProjectService, deleteProjectService, getAllProjectsService, getProjectByIdService, updateProjectByIdService } from "./project.service";


export const createProject = asyncHandler( async ( req: Request, res: Response ) =>
{
    // console.log(req.body)
    let uploadedFiles: string[] = [];

    if ( Array.isArray( req.files ) )
    {
        uploadedFiles = req.files.map( f => f.path );
    } else if ( req.files && typeof req.files === "object" )
    {
        uploadedFiles = Object.values( req.files ).flat().map( f => f.path );
    }

    const project = await createProjectService( { ...req.body, image: uploadedFiles } )
    
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
} )

export const updateProjectById = asyncHandler( async ( req: Request, res: Response ) =>
{
    const id = req.params.id

    if ( !id )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Id not provided!!")
    }

    let uploadedFiles: string[] = [];

    if ( Array.isArray( req.files ) )
    {
        uploadedFiles = req.files.map( f => f.path );
    } else if ( req.files && typeof req.files === "object" )
    {
        uploadedFiles = Object.values( req.files ).flat().map( f => f.path );
    }

    const updatedProject = await updateProjectByIdService( id, { ...req.body, image: uploadedFiles } );

    responseFunction( res, {
        message: "Updated the target!",
        statusCode: httpStatus.OK,
        data: updatedProject
    })
} )

export const deleteProject = asyncHandler( async ( req: Request, res: Response ) =>
{

    const id = req.params.id;

    if ( !id )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Id not provided!!")
    }

    const deleteProject = await deleteProjectService(id)

    if ( !deleteProject )
    {
        throw new AppError( httpStatus.CONFLICT, "Unable to delete project!!" )
    }
        
    responseFunction( res, {
        message: "Blog deleted",
        statusCode: httpStatus.ACCEPTED,
        data: deleteProject
    } )
} );

export const getAllProjects = asyncHandler( async ( req: Request, res: Response ) =>
{

    const query = req.query as Record<string, string>;

    const projects = await getAllProjectsService( query )

    if ( !projects )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Unable to get all projects!!" )
    }

    if ( projects.data?.length === 0 )
    {
        responseFunction( res, {
            message: "projects are empty!",
            statusCode: httpStatus.NOT_FOUND,
            data: []
        } )

        return
    }
        
    responseFunction( res, {
        message: "Get all projects",
        statusCode: httpStatus.OK,
        data: projects
    } )
} );