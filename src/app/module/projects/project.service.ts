import httpStatus from 'http-status-codes';
import slugify from "slugify";
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { PrismaQueryBuilder } from '../../utils/queryBuilder';
import { PROJECT_ARRAY_FIELDS, PROJECT_DEFAULT_LIMIT, PROJECT_DEFAULT_PAGE, PROJECT_DEFAULT_SORT_FIELD, PROJECT_DEFAULT_SORT_ORDER, PROJECT_EXCLUDED_FIELDS, PROJECT_FILTERABLE_FIELDS, PROJECT_SEARCHABLE_FIELDS } from './projects.constants';
import { CreateProjectTypes, UpdateProjectTypes } from "./projects.types";


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


export const updateProjectByIdService = async ( id: string, payload: UpdateProjectTypes ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Project ID must be a valid number." );
    }

    const existingProject = await myPrisma.project.findUnique( {
        where: { id: Number( id ) },
    } );

    if ( !existingProject )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Project not found!" );
    }

    let updatedSlug = existingProject.slug;
    if ( payload.title && payload.title !== existingProject.title )
    {
        let slug = slugify( payload.title, { lower: true, strict: true } );
    
        //  unique slug
        const existingSlug = await myPrisma.project.findUnique( { where: { slug } } );
        if ( existingSlug && existingSlug.id !== Number( id ) )
        {
            slug = `${ slug }-${ Date.now() }`;
        }
    
        updatedSlug = slug;
    }

    const updatedProject = await myPrisma.project.update( {
        where: { id: Number( id ) },
        data: {
            ...payload,
            slug: updatedSlug,
        },
    } );

    if ( !updatedProject )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Failed to update the project!" );
    }

    return updatedProject;
};


export const deleteProjectService = async ( id: string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, " ID must be a valid number." );
    }

    
    const existingProject = await myPrisma.project.findUnique( {
        where: { id: Number( id ) },
    } );

    if ( !existingProject )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Project not found!" );
    }


    const deletedProject = await myPrisma.project.delete( {
        where: { id: Number( id ) },
    } );

    return deletedProject
};


export const getAllProjectsService = async ( query?: Record<string, string> ) =>
{
    const builder = new PrismaQueryBuilder( {
        model: myPrisma.project,
        searchableFields: PROJECT_SEARCHABLE_FIELDS,
        filterableFields: PROJECT_FILTERABLE_FIELDS,
        arrayFields: PROJECT_ARRAY_FIELDS,
        excludeFields: PROJECT_EXCLUDED_FIELDS,
        search: query?.search,
        sortBy: query?.sortBy || PROJECT_DEFAULT_SORT_FIELD,
        sortOrder: ( query?.sortOrder as "asc" | "desc" ) || PROJECT_DEFAULT_SORT_ORDER,
        page: query?.page ? Number( query.page ) : PROJECT_DEFAULT_PAGE,
        limit: query?.limit ? Number( query.limit ) : PROJECT_DEFAULT_LIMIT,
        filters: query || {},
    } );

    return builder
        .fields( [ "id", "title", "description", "slug", "tags", "image", "createdAt", "githubLink",  "liveLink", "updatedAt"] )
        .sort()
        .pagination()
        .build();
};