const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Replacing 'mongoose.Schema' with word 'Schema'.
const Review = require("./review.js");
const { types } = require("joi");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        url: String,
        filename: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },

    category: {
        type: String,
        enum: ["city", "mountains", "pool", "nature", "arctic", "farm", "room"],
        default: "listing",
    },

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id : {$in : listing.reviews} });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

