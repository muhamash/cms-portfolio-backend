import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { createBlogService, deleteBlogService, getAllBlogsService, getBlogByIdService, updateBlogService } from "./blogs.service";


export const createBlogs = asyncHandler( async ( req: Request, res: Response ) =>
{
    // console.log( "req.files:", req.files );
    const user = req.user

    let uploadedFiles: string[] = [];

    if ( Array.isArray( req.files ) )
    {
        uploadedFiles = req.files.map( f => f.path );
    } else if ( req.files && typeof req.files === "object" )
    {
        uploadedFiles = Object.values( req.files ).flat().map( f => f.path );
    }

    const createdBlog = await createBlogService( { ...req.body, image: uploadedFiles }, user.id );

    if ( !createdBlog )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, "Unable to create a blog!!" )
    }
        
    responseFunction( res, {
        message: "Created a blog",
        statusCode: httpStatus.CREATED,
        data: createdBlog
    } )
} );

export const getBlogById = asyncHandler( async ( req: Request, res: Response ) =>
{
    const id = req.params.id;

    if ( !id )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Id not provided!!")
    }

    const blog = await getBlogByIdService( id );

        
    responseFunction( res, {
        message: "Found a blog",
        statusCode: httpStatus.OK,
        data: blog
    } )
} );

export const getAllBlogs = asyncHandler( async ( req: Request, res: Response ) =>
{

    const query = req.query as Record<string, string>;

    const blogs = await getAllBlogsService( query )

    if ( !blogs )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Unable to get all blogs!!" )
    }

    if ( blogs.data?.length === 0 )
    {
        responseFunction( res, {
            message: "Blogs are empty!",
            statusCode: httpStatus.OK,
            data: []
        } )

        return
    }
        
    responseFunction( res, {
        message: "Get all blogs",
        statusCode: httpStatus.OK,
        data: blogs
    } )
} );

export const updateBlog = asyncHandler( async ( req: Request, res: Response ) =>
{

    const id = req.params.id;

    if ( !id )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Id not provided!!")
    }

    let uploadedFiles: string[] = [];

    if ( Array.isArray( req.files ) )
    {
        uploadedFiles = req.files.map( f => f.path );
    } else if ( req.files && typeof req.files === "object" )
    {
        uploadedFiles = Object.values( req.files ).flat().map( f => f.path );
    }

    const updatedBlog = await updateBlogService(id, { ...req.body, image: uploadedFiles } )
        
    responseFunction( res, {
        message: "Blog updated successfully",
        statusCode: httpStatus.OK,
        data: updatedBlog
    } )
} );

export const deleteBlog = asyncHandler( async ( req: Request, res: Response ) =>
{

    const id = req.params.id;

    if ( !id )
    {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "Id not provided!!")
    }

    const deleteABlog = await deleteBlogService(id)

    if ( !deleteABlog )
    {
        throw new AppError( httpStatus.CONFLICT, "Unable to delete blog!!" )
    }
    // console.log( deleteABlog )
    
    responseFunction( res, {
        message: "Blog deleted",
        statusCode: httpStatus.OK,
        data: deleteABlog
    } )
} );