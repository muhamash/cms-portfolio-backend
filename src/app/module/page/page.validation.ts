import { z } from "zod";


const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const personalInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be at most 100 characters" }),

  address: z
    .string()
    .trim()
    .max(300, { message: "Address must be at most 300 characters" })
    // .optional()
    // .nullable()
    .transform((v) => (v === "" ? null : v)), 

  phone: z
    .string()
    .trim()
    // .optional()
    // .nullable()
    .refine((v) => {
      if (!v) return true; 
      return phoneRegex.test(v);
    }, { message: "Phone must be a valid international number (e.g. +8801XXXXXXXXX)" }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email must be a valid email address" })
    .max(254, { message: "Email is too long" }),

  title: z
    .string()
    .trim()
    .max(120, { message: "Title must be at most 120 characters" })
    // .optional()
    // .nullable()
    .transform((v) => (v === "" ? null : v)),
});


export const updatePersonalInfo = personalInfoSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const socialLinkSchema = z.object( {
  platform: z
    .string()
    .min( 2, "Platform name must be at least 2 characters" )
    .max( 50, "Platform name must be less than 50 characters" ),

  url: z
    .string()
    .url( "Must be a valid URL" )
    .min( 5, "URL must be at least 5 characters" )
} );

export const updateSocialSchema = socialLinkSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const skillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters long")
    .max(50, "Skill name must be less than 50 characters"),
  
  personalInfoId: z.number().int().positive("Invalid personalInfoId"),
} );

export const updateSkillSchema = skillSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );

export const headerSchema = z.object({
  headerText: z
    .string()
    .min(2, "Header text must be at least 2 characters")
    .max(100, "Header text too long"),

  headerSubTitle: z
    .string()
    .min(2, "Header subtitle must be at least 2 characters")
    .max(150, "Header subtitle too long"),

  headerAboutText: z
    .string()
    .min(2, "Header about text must be at least 2 characters")
    .max(200, "Header about text too long"),

  headerAboutSubText: z
    .string()
    .min(2, "Header about sub text must be at least 2 characters")
    .max(200, "Header about sub text too long"),

  headerAboutAddress: z
    .string()
    .min(5, "Header address must be at least 5 characters")
    .max(200, "Header address too long"),

  headerAboutSubTitle: z
    .string()
    .min(2, "Header about subtitle must be at least 2 characters")
    .max(150, "Header about subtitle too long"),
} );

export const updateHeaderSchema = headerSchema.partial().refine( ( data ) => Object.keys( data ).length > 0, {
  message: "At least one field is required to update",
} );