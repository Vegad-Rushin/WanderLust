// const mongoose = require("mongoose");
// const Schema = mongoose.Schema; // Replacing 'mongoose.Schema' with word 'Schema'.
// const Review = require("./review.js");
// const { types } = require("joi");

// const listingSchema = new Schema({
//     title : {
//         type : String,
//         required : true,
//     },
//     description : String,
//     image : {
//         url: String,
//         filename: String,
//     },

//     price : Number,
//     location : String,
//     country : String,

//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Review",
//         }
//     ],
//     owner : {
//         type : Schema.Types.ObjectId,
//         ref: "User"
//     },
//     geometry: {
//         type: {
//             type: String,
//             enum: ["Point"],
//             required: true,
//         },
//         coordinates: {
//             type: [Number],
//             required: true,
//         },
//     },

//     category: {
//         type: String,
//         enum: ["city", "mountains", "pool", "nature", "arctic", "farm", "room"],
//         default: "listing",
//     },

// });

// listingSchema.post("findOneAndDelete", async (listing) => {
//     if(listing) {
//         await Review.deleteMany({ _id : {$in : listing.reviews} });
//     }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        url: String,
        filename: String,
    },

    price: {
        type: Number,
        required: true,
    },

    location: {
        state: {
            type: String,
            required: true,
            enum: [
                "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",
                "Chhattisgarh","Goa","Gujarat","Haryana",
                "Himachal Pradesh","Jharkhand","Karnataka","Kerala",
                "Madhya Pradesh","Maharashtra","Manipur","Meghalaya",
                "Mizoram","Nagaland","Odisha","Punjab",
                "Rajasthan","Sikkim","Tamil Nadu","Telangana",
                "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
                "Delhi","Jammu and Kashmir","Ladakh","Puducherry",
                "Chandigarh","Andaman and Nicobar Islands",
                "Dadra and Nagar Haveli and Daman and Diu",
                "Lakshadweep"
            ]
        },
        city: {
            type: String,
            required: true,
        }
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
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
        required: true,
        enum: ["Homes", "Villas", "Resorts"]
    }

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;