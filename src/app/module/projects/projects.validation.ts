import { z } from "zod";


export const createProjectSchema = z.object( {
    title: z
        .string()
        .min( 3, "Title must be at least 3 characters" )
        .max( 100, "Title must be at most 100 characters" ),
    description: z
        .string()
        .min( 10, "Description must be at least 10 characters" )
        .max( 30000, "Description must be at most 30000 characters" ),
    // image: z.string().url( "Image must be a valid URL" ).optional(),
    tags: z
        .array( z.string().min( 1, "Tag cannot be empty" ) )
        .min( 1, "At least one tag is required" ),
    githubLink: z.string().url( "GitHub link must be a valid URL" ),
    liveLink: z.string().url( "Live link must be a valid URL" ),
} );

export const updateProjectSchema = createProjectSchema
    .partial()
    .refine( ( data ) => Object.keys( data ).length > 0, {
        message: "At least one field is required to update",
    } );

