import { z } from "zod";

const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error:
          "full name should be between 3 and 50 characters long. Try again please",
      })
      .min(3, "full name at least should be 3 characters long")
      .max(50),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email is not a valid email. Try again please",
      })
      .email("invalid email"),
    password: z
      .string({
        required_error: "password is required",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
        "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters:! @ # $ %"
      ),
    passwordConfirm: z
      .string({
        required_error: "Passwords must match",
        invalid_type_error: "Passwords must match",
      })
      .min(1, "Passwords confirm must not be empty"),
    captcha: z
      .string({
        required_error: "Google captcha validation failed, please try again",
        invalid_type_error:
          "Google captcha validation failed, please try again",
      })
      .min(1, "Google captcha validation failed, please try again"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], // This specifies where the error should be attached in case of mismatch
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export default signUpSchema;
