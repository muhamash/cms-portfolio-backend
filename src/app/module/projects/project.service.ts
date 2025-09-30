import httpStatus from 'http-status-codes';
import slugify from "slugify";
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { CreateProjectTypes } from "./projects.types";


export const createProjectService = async ( payload: CreateProjectTypes ) =>
{
    let slug = slugify( payload.title, {
        lower: true,
        strict: true,
    } );

    console.log( payload, slug )
    
    const existing = await myPrisma.blog.findUnique( { where: { slug } } );
    if ( existing )
    {
        slug = `${ slug }-${ Date.now() }`;
    }

    const createProject = await myPrisma.project.create( {
        data: {
            ...payload,
            slug
        }
    } );

    return createProject;
};

export const getProjectByIdService = async ( id: string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Project ID must be a valid number." );
    }

    
    const project = await myPrisma.project.findUnique( {
        where: {
            id: Number( id )
        }
    } )
    
    if ( !project )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Target project not found!" )
    }

    return project
};