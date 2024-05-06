import { InferSchemaType, Schema, model } from "mongoose";

type User = InferSchemaType<typeof userSchema>;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please tell us your name"],
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      // validate: [validator?.isEmail, "please provide a valid email"],
    },
    avatar: {
      default: "",
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", process.env.ADMIN_ROLE],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      // so password does not show up when we do a get request
      select: false,
      minLength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      // so password does not show up when we do a get request
      select: false,
      minLength: 8,
      validate: {
        // !This only works on create and save! example: user.create | user.save
        // !  so we have to use save not update and ...
        validator: function (curEl: string): boolean {
          // @ts-expect-error ts trows an error because this only works on create and save as explained above
          return this.password === curEl;
        },
        message: "Passwords are not the same",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>("User", userSchema);

export { UserModel };
