import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AppError } from "../../config/errors/App.error";
import { ErrorResponsePayload } from "../utils/type.util";
import { isZodError, parseZodError } from "../utils/util.middleware";

// Define custom error interfaces
interface ZodIssue {
  path?: string[];
  field?: string;
  message?: string;
  code?: string;
}

interface CustomIssue {
  path?: string[];
  message?: string;
}

interface ZodError {
  name: string;
  message: string;
  stack?: string;
  issues: ZodIssue[];
}


interface CustomError extends Error {
  statusCode?: number;
  path?: string;
  value?: string;
  errors?: Record<string, unknown>;
}

export const globalErrorResponse = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.BAD_REQUEST;
  let message = "Something went wrong";
  let stack: string | undefined;

  // Handle Zod errors
  if (isZodError(error)) {
    const zodError = error as ZodError;
    const fieldIssues: ZodIssue[] = parseZodError(zodError);
    let customIssues: CustomIssue[] = [];
    
    try {
      customIssues = JSON.parse(zodError.message) || [];
    } catch (e) {
      customIssues = [];
    }

    // Get the first available field name from either path or field
    const fieldName = customIssues[0]?.path?.[0] ?? 
                     fieldIssues[0]?.field ?? 
                     'unknown_field';

    // Get the first available error message
    const errorMessage = fieldIssues[0]?.message ?? 
                        customIssues[0]?.message ?? 
                        "Validation error";

    message = `Validation error on field '${fieldName}': ${errorMessage}`;

    return res.status(httpStatus.BAD_REQUEST).json({
      name: zodError.name || "ZodError",
      message,
      status: httpStatus.BAD_REQUEST,
      success: false,
      errors: customIssues.length ? customIssues : fieldIssues,
      ...(process.env.NODE_ENV === "development" && { stack: zodError.stack }),
    });
  }


  // Handle custom AppError
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    stack = error.stack;
  }
  // Handle general Error objects
  else if (error instanceof Error) {
    const customError = error as CustomError;
    message = error.message;
    stack = error.stack;
    statusCode = customError.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  }
  // Fallback for unknown errors
  else {
    message = "An unexpected error occurred.";
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }

  console.error(error);

  // Build response
  const responsePayload: ErrorResponsePayload = {
    name: (error as Error).name || "Error",
    message,
    status: statusCode,
    success: false,
  };

  if (process.env.NODE_ENV === "development") {
    if (stack) {
      responsePayload.stack = stack;
    } else if ((error as Error).stack) {
      responsePayload.stack = (error as Error).stack;
    }
  }

  return res.status(statusCode).json(responsePayload);
};
