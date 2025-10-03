import z from "zod";
import { personalInfoSchema, updatePersonalInfo } from "./page.validation";


export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type UpdatePersonalInfo = z.infer<typeof updatePersonalInfo>;