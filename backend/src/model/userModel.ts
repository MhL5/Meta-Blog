import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export type User = InferSchemaType<typeof userSchema>;

const userSchema = new Schema(
  {
    fullName: {
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
        // !  This only works on create and save! example: user.create | user.save
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
    emailVerificationToken: String,
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // guard clause - only run if password is modified
  console.log(`pre save`);
  if (!this.isModified("password")) return next();
  console.log(`pre save`);

  // Hashing and salting 😀
  this.password = await bcrypt.hash(this.password, 12);
  console.log(`After hashing and salting:`, this.password);

  // delete the passwordConfirm field
  // we only defined passwordConfirm as an extra layer of protection and validation
  // @ts-expect-error there is no need to store passwordConfirm in DB
  this.passwordConfirm = undefined;

  next();
});

// Generate an emailVerificationToken.
userSchema.methods.generateVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return verificationToken;
};

const UserModel = model<User>("User", userSchema);

export { UserModel };
