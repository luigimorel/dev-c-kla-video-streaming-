import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already in use",
    required: "Email is required",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  created: {
    type: Date,
    createdAt: Date.now,
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});

userSchema
  .virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods = {
  authenticate: (plainText) => {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: (password) => {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: () => {
    return Math.round(new Date().valueOf() * Math.random()) + " ";
  },
};

userSchema.path("hashed_password").validate((v) => {
  if (this._password && this.password < 6) {
    this.invalidate("password", "Password must be greater than 6 characters");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);
export default mongoose.model("User", userSchema);
