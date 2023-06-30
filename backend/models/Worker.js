const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const WorkerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
    },

    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating can not be more than 5"],
    },

    address: {
      type: String,
      default: "",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      streetNumber: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },

    idPhoto: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Adauga un numar de telefon valid",
      ],
      default: "",
    },

    services: [
      {
        service: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],

    schedule: {
      type: [mongoose.Schema.ObjectId],
      ref: "Schedule",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

WorkerSchema.pre("save", async function (next) {
  if (!this.isModified("address")) {
    next();
  }

  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    country: loc[0].countryCode,
    zipcode: loc[0].zipcode,
  };

  this.address = undefined;
});

WorkerSchema.pre("findOneAndUpdate", async function (next) {
  const updateWorker = this.getUpdate();

  if (!updateWorker.address) {
    next();
  }

  const loc = await geocoder.geocode(updateWorker.address);

  updateWorker.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    country: loc[0].countryCode,
    zipcode: loc[0].zipcode,
  };

  updateWorker.address = undefined;
});

module.exports = mongoose.model("Worker", WorkerSchema);
