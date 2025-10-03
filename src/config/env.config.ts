import dotenv from "dotenv";

dotenv.config();

type EnvString = Record<string, string>;

export const envStrings: EnvString = {
    PORT: process.env.PORT!,
    DATABASE_URL: process.env.DATABASE_URL!,
    // NODE_ENV: process.env.NODE_ENV as "development" | "production",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    BCRYPT_SALT: process.env.BCRYPT_SALT!,
    AUTH_SECRET: process.env.AUTH_SECRET!,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};