"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.deleteImageFromCLoudinary = exports.uploadBufferToCloudinary = void 0;
// Frontedn -> Form Data with Image File -> Multer -> Form data -> Req (Body + File)
const cloudinary_1 = require("cloudinary");
const stream_1 = __importDefault(require("stream"));
const env_config_1 = require("../env.config");
const App_error_1 = require("../errors/App.error");
// Amader folder -> image -> form data -> File -> Multer -> Amader project / pc te Nijer ekta folder(temporary) -> Req.file
//req.file -> cloudinary(req.file) -> url -> mongoose -> mongodb
// console.log(envStrings)
cloudinary_1.v2.config({
    cloud_name: env_config_1.envStrings.CLOUDINARY_CLOUD_NAME,
    api_key: env_config_1.envStrings.CLOUDINARY_API_KEY,
    api_secret: env_config_1.envStrings.CLOUDINARY_API_SECRET
});
const uploadBufferToCloudinary = async (buffer, fileName) => {
    try {
        return new Promise((resolve, reject) => {
            const public_id = `pdf/${fileName}-${Date.now()}`;
            const bufferStream = new stream_1.default.PassThrough();
            bufferStream.end(buffer);
            cloudinary_1.v2.uploader.upload_stream({
                resource_type: "auto",
                public_id: public_id,
                folder: "pdf"
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }).end(buffer);
        });
    }
    catch (error) {
        console.log(error);
        throw new App_error_1.AppError(401, `Error uploading file ${error.message}`);
    }
};
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
const deleteImageFromCLoudinary = async (url) => {
    try {
        //https://res.cloudinary.com/djzppynpk/image/upload/v1753126572/ay9roxiv8ue-1753126570086-download-2-jpg.jpg.jpg
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
        const match = url.match(regex);
        console.log({ match });
        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary_1.v2.uploader.destroy(public_id);
            console.log(`File ${public_id} is deleted from cloudinary`);
        }
    }
    catch (error) {
        throw new App_error_1.AppError(401, "Cloudinary image deletion failed", error.message);
    }
};
exports.deleteImageFromCLoudinary = deleteImageFromCLoudinary;
exports.cloudinaryUpload = cloudinary_1.v2;
// const uploadToCloudinary = cloudinary.uploader.upload()
//
//Multer storage cloudinary
//Amader folder -> image -> form data -> File -> Multer -> storage in cloudinary -> url ->  req.file  -> url  -> mongoose -> mongodb
