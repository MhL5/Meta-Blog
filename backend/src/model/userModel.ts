import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export type IUser = {
  fullName: string;
  bio: string;
  email: string;
  avatar: string;
  role: "user" | "metaBlogAdmin";
  password: string;
  passwordConfirm: string | undefined;
  passwordChangedAt: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  emailVerificationToken: string | undefined;
  emailVerificationTokenExpires: Date | undefined;
  active: boolean;
  refreshToken: string[];
  createdAt: Date;
  updatedAt: Date;
};

type IUserMethods = {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter: (jwtTimeStamp: number) => boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
      enum: ["user", "metaBlogAdmin"],
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
    emailVerificationTokenExpires: Date,
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // guard clause - only run if password is modified
  if (!this.isModified("password")) return next();

  // Hashing and salting 😀
  this.password = await bcrypt.hash(this.password, 12);

  // delete the passwordConfirm field
  // we only defined passwordConfirm as an extra layer of protection and validation
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

userSchema.methods.changedPasswordAfter = function (JwtTimestamp: number) {
  // false means not changed
  // if changedTimestamp is less than changedTimestamp this means password haven't changed
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      `${this.passwordChangedAt.getTime() / 1000}`,
      10
    );

    return JwtTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  // since password field has select:false we can not use this.password here
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = model<IUser, UserModel>("User", userSchema);

export { UserModel };
