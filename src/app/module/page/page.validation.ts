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