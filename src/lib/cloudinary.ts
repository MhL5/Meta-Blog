import { v2 as cloudinaryV2 } from "cloudinary";
import { env } from "@/utils/env";

cloudinaryV2.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinaryV2;
