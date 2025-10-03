import httpStatus from "http-status-codes";
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { PersonalInfoInput, UpdatePersonalInfo } from "./page.type";

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