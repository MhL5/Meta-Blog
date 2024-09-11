import { CldImageProps } from "next-cloudinary";
import Image, { ImageProps } from "next/image";
import CloudinaryImage from "./CloudinaryImage";

type SmartImageProps =
  | ({ as: "cloudinaryImage" } & CldImageProps)
  | ({ as: "nextImage" } & ImageProps);

/**
 * #### Renders next Image component or CloudinaryImage component based on the `as` prop
 * why? because cloudinary only renders the component that are coming from cloudinary
 * not all images come from cloudinary like user avatar image which usually comes from google or github
 *
 * @example
 * <SmartImage as={`${src.startsWith("https://res.cloudinary.com") ? "cloudinaryImage" : "nextImage"}`} />
 */
export default function SmartImage(props: SmartImageProps) {
  if (props.as === "cloudinaryImage") return <CloudinaryImage {...props} />;

  // eslint-disable-next-line
  return <Image {...props} />;
}
