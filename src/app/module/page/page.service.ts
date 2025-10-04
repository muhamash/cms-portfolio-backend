import httpStatus from "http-status-codes";
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { CreateEducationInput, CreateExperienceInput, HeaderSkillTypes, HeaderStatsType, HomePageTypes, PersonalInfoInput, SkillTypes, SocialLinkTypes, UpdateEducationInput, UpdateExperienceInput, UpdateHeaderStatsType, UpdateHomePageTypes, UpdatePersonalInfo, UpdateSkillTypes, UpdateSocialLinkTypes } from "./page.type";

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
            id: Number( id ),
            userId: userId
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


// header skill
export const createHeaderSkillService = async (
    payload: HeaderSkillTypes,
    userId: number
) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
        include: { HomePage: true },
    } );

    if ( !personalInfo || !personalInfo.HomePage )
    {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Homepage not found for this user"
        );
    }

    const newSkill = await myPrisma.headerSkill.create( {
        data: {
            skill: payload.skill,
            homePage: {
                connect: { id: Number( personalInfo.HomePage.id ) }
            }
        },
    } );

    if ( !newSkill )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Failed to create new skill")
    }

    return newSkill;
};

export const updateHeaderSkillService = async (
    payload: HeaderSkillTypes,
    userId: number,
    id: string
) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
        include: { HomePage: true },
    } );

    if ( !personalInfo || !personalInfo.HomePage )
    {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Homepage not found for this user"
        );
    }

    const skillExists = await myPrisma.headerSkill.findUnique( {
        where: { id: numericId },
    } );

    if ( !skillExists )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Header skill not found" );
    }

    const updatedSkill = await myPrisma.headerSkill.update( {
        where: { id : numericId },
        data: {
            skill: payload.skill ?? skillExists.skill,
            homePage: {
                connect: { id: Number( personalInfo.HomePage.id ) }
            }
        },
    } );

    if ( !updatedSkill )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Failed to update expectation failed")
    }

    return updatedSkill;
};

// homepage sats
export const createHeaderStatService = async (
    payload: HeaderStatsType,
    userId: number
) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
        include: { HomePage: true },
    } );

    if ( !personalInfo || !personalInfo.HomePage )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Homepage not found for this user" );
    }

    const newHomepageStat = await myPrisma.homePageStat.create( {
        data: {
            label: payload.label,
            value: payload.value,
            homePage: { connect: { id: Number( personalInfo.HomePage.id ) } }
        },
    } );

    if ( !newHomepageStat )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Unable create homepage stat")
    }

    return newHomepageStat
};

// Update HomePageStat
export const updateHeaderStatService = async (
    payload: UpdateHeaderStatsType,
    userId: number,
    id: string
) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
        include: { HomePage: true },
    } );

    if ( !personalInfo || !personalInfo.HomePage )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Homepage not found for this user" );
    }

    const stat = await myPrisma.homePageStat.findUnique( { where: { id: numericId } } );

    if ( !stat )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Header stat not found" );
    }

    const updateHomeStat = await myPrisma.homePageStat.update( {
        where: { id: numericId },
        data: {
            label: payload.label ?? stat.label,
            value: payload.value ?? stat.value,
            homePage: { connect: { id: Number( personalInfo.HomePage.id ) } }
        },
    } );

    if ( !updateHomeStat )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Unable to update homepage stat")
    }
    
    return updateHomeStat
};

// Create Education
export const createEducationService = async (
    payload: CreateEducationInput,
    userId: number
) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const newEducation = await myPrisma.education.create( {
        data: {
            degree: payload.degree,
            institute: payload.institute,
            timeLine: payload.timeLine,
            description: payload.description,
            personalInfo: { connect: { id: Number( personalInfo.id ) } }

        },
    } );

    if ( !newEducation )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Unable to create education" );
    }

    return newEducation;
};

// Update Education
export const updateEducationService = async (
    payload: UpdateEducationInput,
    id: number,
    userId: number
) =>
{
    const numericId = Number( id );
    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "ID must be a valid number." );
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const existingEducation = await myPrisma.education.findUnique( {
        where: { id: numericId },
    } );

    if ( !existingEducation )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Education record not found" );
    }

    const updatedEducation = await myPrisma.education.update( {
        where: { id: numericId },
        data: {
            degree: payload.degree ?? existingEducation.degree,
            institute: payload.institute ?? existingEducation.institute,
            timeLine: payload.timeLine ?? existingEducation.timeLine,
            description: payload.description ?? existingEducation.description,
            personalInfo: { connect: { id: Number( personalInfo.id ) } }
        },
    } );

    if ( !updatedEducation )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Unable to update education" );
    }

    return updatedEducation;
};

// Create Work Experience
export const createExperienceService = async (
    payload: CreateExperienceInput,
    userId: number
) =>
{
    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const newExperience = await myPrisma.workExperience.create( {
        data: {
            position: payload.position,
            company: payload.company,
            timeLine: payload.timeLine,
            description: payload.description,
            personalInfo: {
                connect: {
                    id: Number(personalInfo.id),
                }
            }
        },
    } );

    if ( !newExperience )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Unable to create experience" );
    }

    return newExperience;
};

// Update Work Experience
export const updateExperienceService = async (
    payload: UpdateExperienceInput,
    id: number,
    userId: number
) =>
{
    const numericId = Number( id );
    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "ID must be a valid number." );
    }

    const personalInfo = await myPrisma.personalInfo.findUnique( {
        where: { userId },
    } );

    if ( !personalInfo )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Personal info not found for this user" );
    }

    const existingExperience = await myPrisma.workExperience.findUnique( {
        where: { id: numericId },
    } );

    if ( !existingExperience )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Experience record not found" );
    }

    const updatedExperience = await myPrisma.workExperience.update( {
        where: { id: numericId },
        data: {
            position: payload.position ?? existingExperience.position,
            company: payload.company ?? existingExperience.company,
            timeLine: payload.timeLine ?? existingExperience.timeLine,
            description: payload.description ?? existingExperience.description,
            personalInfo: {
                connect: {
                    id: Number(personalInfo.id),
                }
            }
        },
    } );

    if ( !updatedExperience )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Unable to update experience" );
    }

    return updatedExperience;
};