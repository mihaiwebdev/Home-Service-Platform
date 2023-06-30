const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  worker: {
    type: mongoose.Schema.ObjectId,
    ref: "Worker",
  },

  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ worker: 1, client: 1 }, { unique: true });

// Statics method for avg rating
ReviewSchema.statics.getAverageRating = async function (workerId) {
  const obj = await this.aggregate([
    {
      $match: { worker: workerId },
    },
    {
      $group: {
        _id: "$worker",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Worker").findByIdAndUpdate(workerId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.log(err);
  }
};

ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.worker);
});

ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.worker);
});

module.exports = mongoose.model("Review", ReviewSchema);
