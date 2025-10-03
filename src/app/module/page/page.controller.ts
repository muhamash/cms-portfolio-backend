import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { personalInfoService, updatePersonalInfoService } from "./page.service";


export const getPersonalInfo = asyncHandler( async ( req: Request, res: Response ) =>
{
    const personalInfo = await myPrisma.personalInfo.findFirst();

    if ( !personalInfo )
    {
        throw new AppError(httpStatus.NOT_FOUND, "Personal info found")
    }

    responseFunction( res, {
        message: "Got personal info",
        statusCode: httpStatus.OK,
        data: personalInfo
    })
})


export const createPersonalInfo = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user
    
    let uploadedFiles: string[] = [];

    if ( Array.isArray( req.files ) )
    {
        uploadedFiles = req.files.map( f => f.path );
    }
    else if ( req.files && typeof req.files === "object" )
    {
        uploadedFiles = Object.values( req.files ).flat().map( f => f.path );
    }

    const createPersonalInfo = await personalInfoService( req.body, uploadedFiles, user.id )
    
    if ( !createPersonalInfo )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Unable to create personal info!!" )
    }

    responseFunction( res, {
        message: "Created personal info",
        statusCode: httpStatus.CREATED,
        data: createPersonalInfo
    } )
} )

export const updatedPersonalInfo = asyncHandler( async ( req: Request, res: Response ) =>
{
    console.log( "update personal info" )
    const user = req.user
    const id = req.params.id
    
    let uploadedFiles: string[] = [];

    if ( Array.isArray( req.files ) )
    {
        uploadedFiles = req.files.map( f => f.path );
    }
    else if ( req.files && typeof req.files === "object" )
    {
        uploadedFiles = Object.values( req.files ).flat().map( f => f.path );
    }
    

    const updateProfile = await updatePersonalInfoService( req.body, uploadedFiles, user.id, id );

    responseFunction( res, {
        message: "Profile info updated",
        statusCode: httpStatus.OK,
        data: updateProfile
    })
})