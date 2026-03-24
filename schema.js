// const Joi = require("joi");

// module.exports.listingSchema = Joi.object({
//     listing : Joi.object({
//         title : Joi.string().required(),
//         description : Joi.string().required(),
//         location : Joi.string().required(),
//         country : Joi.string().required(),
//         price : Joi.number().required().min(0),
//         image : Joi.string().allow("", null),
//         category: Joi.string().valid("city", "mountains", "pool", "nature", "arctic", "farm", "room"),
//     }).required(),
// });

// module.exports.reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         comment: Joi.string().required(),
//     }).required(),
// });

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({

        title: Joi.string().required(),

        description: Joi.string().required(),

        price: Joi.number().required().min(0),

        image: Joi.string().allow("", null),

        category: Joi.string()
            .valid("Homes", "Villas", "Resorts")
            .required(),

        location: Joi.object({
            state: Joi.string()
                .valid(
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
                )
                .required(),

            city: Joi.string().required()
        }).required()

    }).required()
});



module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});