const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    experience: {
      type: String,
      required: [true, "Experience cannot be empty"],
      trim: true,
      maxlength: 800,
    },
  },
  {
    timestamps: true,
  }
);

experienceSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

experienceSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Experience", experienceSchema);