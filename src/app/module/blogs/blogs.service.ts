import httpStatus from 'http-status-codes';
import slugify from 'slugify';
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { BlogTypes, UpdateBlogTypes } from "./blogs.types";


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
    const getBlog = await myPrisma.blog.findUnique( {
        where: {
            id: Number( id )
        }
    } );

    // console.log(getBlog)
    if ( !getBlog )
    {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found")
    }

    return getBlog;
}


export const updateBlogService = async (
    id: string,
    payload: UpdateBlogTypes
) =>
{
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