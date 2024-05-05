import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    trim: true,
    lowercase: true,
    // validate: [validator?.isEmail, "please provide a valid email"],
  },
  photo: {
    default: "default.jpg",
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
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
        // @ts-ignore ts trows an error because this only works on create and save as explained above
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
});
