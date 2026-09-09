const mongoose = require("mongoose");

const seniorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Format output to include custom ticket id matching the frontend expectation
seniorSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

seniorSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Senior", seniorSchema);