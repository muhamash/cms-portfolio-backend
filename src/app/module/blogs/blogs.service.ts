import httpStatus from 'http-status-codes';
import slugify from 'slugify';
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { PrismaQueryBuilder } from '../../utils/queryBuilder';
import { BLOG_DEFAULT_LIMIT, BLOG_DEFAULT_PAGE, BLOG_DEFAULT_SORT_FIELD, BLOG_DEFAULT_SORT_ORDER, BLOG_EXCLUDED_FIELDS, BLOG_SEARCHABLE_FIELDS } from './blog.constants';
import { BlogTypes, UpdateBlogTypes } from "./blogs.types";


export const getAllBlogsService = async ( query?: Record<string, string> ) =>
{
    const builder = new PrismaQueryBuilder( {
        model: myPrisma.blog,
        searchableFields: BLOG_SEARCHABLE_FIELDS,
        excludeFields: BLOG_EXCLUDED_FIELDS,
        search: query?.search,
        sortBy: query?.sortBy || BLOG_DEFAULT_SORT_FIELD,
        sortOrder: ( query?.sortOrder as "asc" | "desc" ) || BLOG_DEFAULT_SORT_ORDER,
        page: query?.page ? Number( query.page ) : BLOG_DEFAULT_PAGE,
        limit: query?.limit ? Number( query.limit ) : BLOG_DEFAULT_LIMIT,
    } );

    const result = await builder
        .fields( [ "id", "title", "content", "slug", "tags", "image", "createdAt" ] )
        .sort()
        .pagination()
        .build();

    // console.log( result );

    return result;
};


export const createBlogService = async ( payload: BlogTypes ) =>
{
    let slug = slugify( payload.title, {
        lower: true,
        strict: true,
    } );

    const existing = await myPrisma.blog.findUnique( { where: { slug } } );
    if ( existing )
    {
        slug = `${ slug }-${ Date.now() }`;
    }
    
    const createdBlog = await myPrisma.blog.create( {
        data: {
            title: payload.title,
            content: payload.content,
            image: payload.image,
            tags: payload.tags ?? [],
            slug: slug
        },
    } );

    // console.log( createdBlog )
    
    if ( !createdBlog )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Can not create the blog!!" )
    }

    return createdBlog
};


export const getBlogByIdService = async ( id: string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Project ID must be a valid number." );
    }

    
    const getBlog = await myPrisma.blog.findUnique( {
        where: {
            id: Number( id )
        }
    } );

    // console.log(getBlog)
    if ( !getBlog )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Blog not found" )
    }

    return getBlog;
};


export const updateBlogService = async (
    id: string,
    payload: UpdateBlogTypes
) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Project ID must be a valid number." );
    }

    
    // Fetch the existing blog
    const existingBlog = await myPrisma.blog.findUnique( {
        where: { id: Number( id ) },
    } );

    if ( !existingBlog )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Blog not found!" );
    }

    // If title is updated, regenerate slug
    let updatedSlug = existingBlog.slug;
    if ( payload.title && payload.title !== existingBlog.title )
    {
        let slug = slugify( payload.title, { lower: true, strict: true } );

        //  unique slug
        const existingSlug = await myPrisma.blog.findUnique( { where: { slug } } );
        if ( existingSlug && existingSlug.id !== Number( id ) )
        {
            slug = `${ slug }-${ Date.now() }`;
        }

        updatedSlug = slug;
    }

    const updatedBlog = await myPrisma.blog.update( {
        where: { id: Number( id ) },
        data: {
            ...payload,
            slug: updatedSlug,
        },
    } );

    if ( !updatedBlog )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Failed to update the blog!" );
    }

    return updatedBlog;
};


export const deleteBlogService = async ( id: string ) =>
{
    const numericId = Number( id );

    if ( isNaN( numericId ) )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Project ID must be a valid number." );
    }

    
    const existingBlog = await myPrisma.blog.findUnique( {
        where: { id: Number( id ) },
    } );

    if ( !existingBlog )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Blog not found!" );
    }

    // Delete the blog
    const deletedBlog = await myPrisma.blog.delete( {
        where: { id: Number( id ) },
    } );

    return deletedBlog
};