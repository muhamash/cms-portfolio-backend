import httpStatus from 'http-status-codes';
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { PersonalInfoInput } from "./page.type";


export const personalInfoService = async (payload:PersonalInfoInput, image: any, userId: number) =>
{
    const exist = await myPrisma.personalInfo.findUnique( {
        where: {
            userId : userId
        }
    } )
    
    if ( exist )
    {
        throw new AppError(httpStatus.CONFLICT, "Already exists!!")
    }

    const createPersonalInfo = await myPrisma.personalInfo.create( {
        data: {
            ...payload,
            image: image[ 0 ],
            userId: userId
        }
    } )
    
    if ( !createPersonalInfo )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Unable to create personal info")
    }

    return createPersonalInfo

}