import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const allowedImageFormats = ["jpeg", "jpg", "png", "webp"];

const imageSchema = z
  .instanceof(File)
  .refine((file) => {
    return !file || file.size <= MAX_FILE_SIZE;
  }, "Max image size is 2MB.")
  .refine((file) => {
    return !!file?.type && ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type);
  }, "Only .jpg, .jpeg, .png and .webp formats are supported.");

export type ImageSchemaType = z.infer<typeof imageSchema>;
export default imageSchema;
