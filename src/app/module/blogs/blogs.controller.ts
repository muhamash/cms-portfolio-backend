import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { myPrisma } from "../../../config/db/getPrisma";
import { AppError } from "../../../config/errors/App.error";
import { asyncHandler, responseFunction } from "../../utils/controller.util";
import { createBlogService, deleteBlogService, getBlogByIdService, updateBlogService } from "./blogs.service";


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

    const blog = await getBlogByIdService( id );

        
    responseFunction( res, {
        message: "Found a blog",
        statusCode: httpStatus.OK,
        data: blog
    } )
} );

export const getAllBlogs = asyncHandler( async ( req: Request, res: Response ) =>
{

    const blogs = await myPrisma.blog.findMany();

    if ( !blogs )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Unable to get all blogs!!" )
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