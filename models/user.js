const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid email address"],
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    avatarURL: String,
  },
  { versionKey: false, timestamp: true }
);
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const authJoiSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const updateSubscribeSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = { User, authJoiSchema, updateSubscribeSchema };
