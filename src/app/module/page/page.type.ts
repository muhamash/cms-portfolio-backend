import z from "zod";
import { headerSchema, personalInfoSchema, skillSchema, socialLinkSchema, updateHeaderSchema, updatePersonalInfo, updateSkillSchema, updateSocialSchema } from "./page.validation";


export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type UpdatePersonalInfo = z.infer<typeof updatePersonalInfo>;
export type SocialLinkTypes = z.infer<typeof socialLinkSchema>;
export type UpdateSocialLinkTypes = z.infer<typeof updateSocialSchema>;
export type SkillTypes = z.infer<typeof skillSchema>;
export type UpdateSkillTypes = z.infer<typeof updateSkillSchema>;
export type HomePageTypes = z.infer<typeof headerSchema>;
export type UpdateHomePageTypes = z.infer<typeof updateHeaderSchema>;