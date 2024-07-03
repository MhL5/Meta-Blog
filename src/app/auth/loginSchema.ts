import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email is not a valid email. Try again please",
    })
    .email("invalid email")
    .min(1),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
  captcha: z
    .string({
      required_error: "Google captcha validation failed, please try again",
      invalid_type_error: "Google captcha validation failed, please try again",
    })
    .min(1, "Google captcha validation failed, please try again"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export default loginSchema;
