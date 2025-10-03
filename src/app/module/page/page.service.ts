import httpStatus from "http-status-codes";
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { HomePageTypes, PersonalInfoInput, SkillTypes, SocialLinkTypes, UpdateHomePageTypes, UpdatePersonalInfo, UpdateSkillTypes, UpdateSocialLinkTypes } from "./page.type";

export const personalInfoService = async (
    payload: PersonalInfoInput,
    image: any, 
    userId: number
) =>
{
    if (!image || !image[0]) throw new AppError(httpStatus.BAD_REQUEST, "Image is required");


    const exist = await myPrisma.personalInfo.findUnique( { where: { userId } } );

    if ( exist )
    {
        throw new AppError( httpStatus.CONFLICT, "Personal info already exists" );
    }

    const createPersonalInfo = await myPrisma.personalInfo.create( {
        data: {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            address: payload.address, 
            title: payload.title,     
            image: image[ 0 ],
            user: { connect: { id: userId } }
        }
    } );

    if ( !createPersonalInfo )
    {
        throw new AppError(
            httpStatus.EXPECTATION_FAILED,
            "Unable to create personal info"
        );
    }

    return createPersonalInfo;
};

export const updatePersonalInfoService = async ( payload: UpdatePersonalInfo,
    image: any,
    userId: number, id: string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    const existingPersonalInfo = await myPrisma.personalInfo.findUnique( {
        where: {
            id: Number(id)
        }
    } ) 
    
    if ( !existingPersonalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "existingPersonalInfo not found" )
    }

    const updateProfileInfo = await myPrisma.personalInfo.update( {
        where: {
            id: Number( id ),
            userId: userId
        },
        data: {
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            address: payload.address, 
            title: payload.title,     
            image: image[ 0 ],
            user: { connect: { id: userId } }
        }
    } )
    
    if ( !updateProfileInfo )
    {
        throw new AppError(
            httpStatus.EXPECTATION_FAILED,
            "Unable to update personal info"
        );
    }

    return updateProfileInfo
};


export const createSocialLinkService = async ( payload: SocialLinkTypes, userId: number ) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId }
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const createLinks = await myPrisma.socialLink.create( {
        data: {
            platform: payload.platform,
            url: payload.url,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    } )
    
    if ( !createLinks )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Failed to create social links" );
    }

    return createLinks

};

export const updateSocialLinkService = async ( payload: UpdateSocialLinkTypes, userId: number, id: string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    const existing = await myPrisma.socialLink.findUnique( {
        where: {
            id: numericId
        }
    } )
    
    if ( !existing )
    {
        throw new AppError(httpStatus.NOT_FOUND, "Social link not found")
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId }
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const updatedLinks = await myPrisma.socialLink.update( {
        where: {
            id: Number(id)
        },
        data: {
            platform: payload.platform,
            url: payload.url,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    } )
    
    if ( !updatedLinks )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Failed to create social updatedLinks" );
    }

    return updatedLinks
};

export const createSkillService = async ( payload: SkillTypes, userId: Number ) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: {
            id: Number(userId)
        }
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const createSkill = await myPrisma.skill.create( {
        data: {
            name: payload.name.toLowerCase(),
            personalInfoId: personalInfo.id
        }
    } )
    
    if ( !createSkill )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Failed to create skill" );
    }

    return createSkill
}

export const updateSkillService = async ( payload: UpdateSkillTypes, userId: Number, id:  string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    const existing = await myPrisma.skill.findUnique( {
        where: {
            id : numericId
        }
    } )
    
    if ( !existing )
    {
        throw new AppError(httpStatus.NOT_FOUND, "Skill not found")
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { 
            id: numericId
         }
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const updateSkill = await myPrisma.skill.update( {
        where: {
            id: Number(id)
        },
        data: {
            name: payload.name.toLowerCase(),
            personalInfoId: personalInfo.id
        }
    } )
    
    if ( !updateSkill )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Failed to updateSkill" );
    }

    return updateSkill
}

// home page
export const createHomepageService = async (payload: HomePageTypes, userId : number) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId }
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const createHomePage = await myPrisma.homePage.create( {
        data: {
            headerText: payload.headerText,
            headerSubTitle: payload.headerSubTitle,
            headerAboutSubText: payload.headerAboutText,
            headerAboutAddress: payload.headerAboutSubTitle,
            headerAboutSubTitle: payload.headerAboutSubTitle,
            headerAboutText: payload.headerAboutText,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    } )
    
    if ( !createHomePage )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Can not create home page data")
    }

    return createHomePage
}

export const updateHomepageService = async (payload: UpdateHomePageTypes, userId : number, id: string) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    const existing = await myPrisma.homePage.findUnique( {
        where: {
            id: numericId
        }
    } )
    
    if ( !existing )
    {
        throw new AppError(httpStatus.NOT_FOUND, "Home page data not found!!")
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId }
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const updateHomePage = await myPrisma.homePage.update( {
        where: {
            id: numericId
        },
        data: {
            headerText: payload.headerText,
            headerSubTitle: payload.headerSubTitle,
            headerAboutSubText: payload.headerAboutText,
            headerAboutAddress: payload.headerAboutSubTitle,
            headerAboutSubTitle: payload.headerAboutSubTitle,
            headerAboutText: payload.headerAboutText,
            personalInfo: { connect: { id: personalInfo.id } }
        }
    } )
    
    if ( !updateHomePage )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Can not updateHomePage  data")
    }

    return updateHomePage
}