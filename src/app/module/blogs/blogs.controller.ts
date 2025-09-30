import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { createBlogService, deleteBlogService, getAllBlogsService, getBlogByIdService, updateBlogService } from "./blogs.service";


export const createBlogs = asyncHandler( async ( req: Request, res: Response ) =>
{
    const createdBlog = await createBlogService( req.body );

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

    const updatedBlog = await updateBlogService(id, req.body)
        
    responseFunction( res, {
        message: "Blog updated successfully",
        statusCode: httpStatus.ACCEPTED,
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
        
    responseFunction( res, {
        message: "Blog deleted",
        statusCode: httpStatus.ACCEPTED,
        data: deleteABlog
    } )
} );