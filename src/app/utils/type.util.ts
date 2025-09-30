import { NextFunction, Request, Response } from "express";

export type AsyncHandlerType = ( req: Request, res: Response, next: NextFunction ) => Promise<void>;

export interface TMeta
{
    total: number;
}

export interface TResponse<T>
{
    statusCode: number;
    data: T;
    message: string;
    success?: boolean;
    meta?: TMeta
}


export type ParsedZodIssue = Record<string, string>;

export interface ErrorResponsePayload {
  name: string;
  message: string;
  status: number;
  success: boolean;
  stack?: string;
  errors?: Array<{
    field?: string;
    message?: string;
    path?: string[];
  }>;
}

export interface QueryBuilderOptions<T> {
  model: T;
  searchableFields?: string[];
  excludeFields?: string[];
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}