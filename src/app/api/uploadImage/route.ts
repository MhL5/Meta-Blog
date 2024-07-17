import imageSchema, {
  allowedImageFormats,
} from "@/app/write-article/imageSchema";
import { auth } from "@/lib/auth";
import cloudinaryV2 from "@/lib/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

/**
 * Handles the POST request to upload an image to Cloudinary.
 *
 * This function checks if a user is logged in, validates the uploaded image against a schema, and then uploads the image to Cloudinary.
 * It returns the secure URL of the uploaded image upon success or a default failed image URL along with an error message on failure.
 *
 * @param req - The incoming request object containing form data with the image file.
 * @param res - The response object used to send back the appropriate HTTP response.
 *
 * @returns A JSON response with the secure URL of the uploaded image or a default failed image URL and an error message if something goes wrong.
 */
export async function POST(req: Request, res: Response) {
  try {
    // 1. check if user is logged in
    const session = await auth();
    if (!session?.user)
      throw new Error("Something went wrong! please login and try again.");

    // 2. taking the image from request
    const formData = await req.formData();
    const imageFile = formData.get("image");
    if (!imageFile) throw new Error("Image is required! please try again.");
    // 3. validate
    const validImage = imageSchema.parse(imageFile);

    // 4. upload to cloudinary
    const arrayBuffer = await validImage?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result: UploadApiResponse | undefined | UploadApiErrorResponse =
      await new Promise((resolve, reject) => {
        cloudinaryV2.uploader
          .upload_stream(
            {
              tags: ["route-handler-write-article-upload-image"],
              upload_preset: "write-article-image",
              resource_type: "image",
              allowed_formats: allowedImageFormats,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          )
          .end(buffer);
      });

    if (!result?.secure_url && typeof result?.secure_url !== "string")
      throw new Error("something went wrong! please try again.");

    return Response.json(result.secure_url, {
      status: 201,
      statusText: "success",
    });
  } catch (error) {
    /**
     * if upload fails we will send a url which points to `failed-to-upload.png`
     */
    return Response.json("/failed-to-upload.png", {
      status: 500,
      statusText: `uploading image failed! please try again. ${error instanceof Error ? error?.message : ""}`,
    });
  }
}
