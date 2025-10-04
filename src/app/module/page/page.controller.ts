import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { createEducationService, createExperienceService, createHeaderSkillService, createHeaderStatService, createHomepageService, createSkillService, createSocialLinkService, personalInfoService, updateEducationService, updateExperienceService, updateHeaderSkillService, updateHeaderStatService, updateHomepageService, updatePersonalInfoService, updateSkillService, updateSocialLinkService } from "./page.service";

// profile info 
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
} )


// social links
export const createSocialLinks = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;

    const socialLink = await createSocialLinkService( req.body, user.id )
    
    responseFunction( res, {
        message: "Social links created",
        statusCode: httpStatus.OK,
        data: socialLink
    } )

} );


export const updateSocialLinks = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;
    const id = req.params.id;

    const socialLink = await updateSocialLinkService( req.body, user.id, id )
    
    responseFunction( res, {
        message: "Social links updated",
        statusCode: httpStatus.OK,
        data: socialLink
    })

} )

// skills
export const createSkills = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;

    const createSkill = await createSkillService( req.body, user.id )
    
    responseFunction( res, {
        message: "skill  created",
        statusCode: httpStatus.OK,
        data: createSkill
    } )

} );

export const updateSkills = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;
    const id = req.params.id

    const updateSkill = await updateSkillService( req.body, user.id , id)
    
    responseFunction( res, {
        message: "skill  updated",
        statusCode: httpStatus.OK,
        data: updateSkill
    } )

} );

// home page
export const getHomePageData = asyncHandler( async ( req: Request, res: Response ) =>
{
    console.log( "get home data" )
    const homePageData = await myPrisma.homePage.findFirst();

    if ( !homePageData )
    {
        throw new AppError(httpStatus.NOT_FOUND, "Home page data not found")
    }

    responseFunction( res, {
        message: "Home page data",
        statusCode: httpStatus.OK,
        data: homePageData
    })
} );


export const createHomePageData = asyncHandler( async ( req: Request, res: Response ) =>
{
    console.log( "create home data" )
    const user = req.user

    const homePage = await createHomepageService( req.body, user.id );

    responseFunction( res, {
        message: "Home page data created",
        statusCode: httpStatus.CREATED,
        data:homePage
    })
    
} )

export const updateHomePageData = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;
    const id = req.params.id

    const updateHome = await updateHomepageService( req.body, user.id, id );

    responseFunction( res, {
        message: "updated home page data",
        statusCode: httpStatus.OK,
        data: updateHome
    })
} )


// header skill
export const createHeaderSkill = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;

    const headerSkill = await createHeaderSkillService( req.body, user.id );
    

    responseFunction( res, {
        message: "created header skill",
        statusCode: httpStatus.CREATED,
        data: headerSkill
    })
} )

export const updateHeaderSkill = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;
    const id = req.params.id;

    const headerSkill = await updateHeaderSkillService( req.body, user.id, id );
    

    responseFunction( res, {
        message: "updated header skill",
        statusCode: httpStatus.CREATED,
        data: headerSkill
    })
} )

// homepage stat
export const createHeaderStat = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user

    const newHeader = await createHeaderStatService( req.body, user.id )
    
    responseFunction( res, {
        message: "created header stats",
        statusCode: httpStatus.CREATED,
        data:newHeader
    })
} )

export const updateHeaderStat = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user
    const id = req.params.id

    const updateHeaderStat = await updateHeaderStatService( req.body, user.id, id )
    
    responseFunction( res, {
        message: "header stat updated",
        statusCode: httpStatus.OK,
        data: updateHeaderStat
    })
} )

//  Create Education
export const createEducation = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;

    const newEducation = await createEducationService( req.body, user.id );

    responseFunction( res, {
        message: "Education created successfully",
        statusCode: httpStatus.CREATED,
        data: newEducation,
    } );
} );

// Update Education
export const updateEducation = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;
    const id = req.params.id;

    const updatedEducation = await updateEducationService( req.body, Number( id ), user.id );

    responseFunction( res, {
        message: "Education updated successfully",
        statusCode: httpStatus.OK,
        data: updatedEducation,
    } );
} );


export const createExperience = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;

    const newExperience = await createExperienceService( req.body, user.id );

    responseFunction( res, {
        message: "Experience created successfully",
        statusCode: httpStatus.CREATED,
        data: newExperience,
    } );
} );

// Update Experience
export const updateExperience = asyncHandler( async ( req: Request, res: Response ) =>
{
    const user = req.user;
    const id = req.params.id;

    const updatedExperience = await updateExperienceService( req.body, Number( id ), user.id );

    responseFunction( res, {
        message: "Experience updated successfully",
        statusCode: httpStatus.OK,
        data: updatedExperience,
    } );
} );