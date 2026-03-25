const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { Query } = require("mongoose");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding( { accessToken: mapToken } );
const Booking = require("../models/booking");

// module.exports.index = async (req,res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", {allListings});
// };

module.exports.index = async (req, res) => {

    const { search } = req.query;

    // If user searched something
    if (search) {

        const listings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { "location.city": { $regex: search, $options: "i" } },
                { "category": { $regex: search, $options: "i" } },
                { "location.state": { $regex: search, $options: "i" } }
            ]
        });

        return res.render("listings/searchResults", { listings, search });
    }

    // NORMAL HOMEPAGE
    const groupedListings = await Listing.aggregate([
        {
            $group: {
                _id: "$location.state",
                listings: { $push: "$$ROOT" }
            }
        },
        {
            $sort: { _id: 1 } // sort states alphabetically
        }
    ]);

    res.render("listings/index", { groupedListings });
};

module.exports.listingsByState = async (req, res) => {

    const { stateName } = req.params;

    const listings = await Listing.find({
        "location.state": stateName
    });

    res.render("listings/state", {
        listings,
        title: `All Listings in ${stateName}`
    });
};

module.exports.listingsByCategory = async (req, res) => {

    const { categoryName } = req.params;

    const listings = await Listing.find({
        category: categoryName
    });

    res.render("listings/state", {
        listings,
        title: `All ${categoryName}`
    });
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        }
    })
    .populate("owner");

    if(!listing) {
        req.flash("error", "The requested listing isn't exist!");
        return res.redirect("/listings");
    }

    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

// Show booking page
module.exports.showBookings = async (req,res) => {

    const { checkIn, checkOut, guests } = req.body;

    const listing = await Listing.findById(req.params.id);

    const nights =
        (new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24);

    const totalPrice = nights * listing.price;

    const booking = new Booking({
        listing: listing._id,
        user: req.user._id,
        checkIn,
        checkOut,
        guests,
        totalPrice
    });

    await booking.save();

    req.flash("success","Booking Confirmed 🎉");

    res.redirect("/bookings");

}

module.exports.createListing = async (req, res, next) => {

    const { city, state } = req.body.listing.location;

    // Combine city + state for geocoding
    let response = await geocodingClient
        .forwardGeocode({
            query: `${city}, ${state}, India`,
            limit: 1,
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    
    if(!listing) {
        req.flash("error", "The requested listing isn't exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


// module.exports.updateListing = async (req,res) => {
//     let {id} = req.params;

//     let response = await geocodingClient
//         .forwardGeocode({
//             query: req.body.listing.location,
//             limit: 1,
//         })
//         .send();

//     if (!response.body.features.length) {
//         req.flash("error", "Invalid location");
//         return res.redirect(`/listings/${id}/edit`);
//     }

//     const newGeometry = response.body.features[0].geometry;

//     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing, geometry: newGeometry});

//     if (!listing) {
//         req.flash("error", "Listing not found");
//         return res.redirect("/listings");
//     }
    
//     console.log(listing);

//     if(typeof req.file !== "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = {url, filename};
//         await listing.save();
//     }

//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
// };

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    // 🔹 Prepare location string
    let locationData = req.body.listing.location;
    let fullLocation = `${locationData.city}, ${locationData.state}`;

    // 🔹 Get coordinates from Mapbox
    let response = await geocodingClient
        .forwardGeocode({
            query: fullLocation,
            limit: 1,
        })
        .send();

    if (!response.body.features.length) {
        req.flash("error", "Invalid location");
        return res.redirect(`/listings/${id}/edit`);
    }

    let geometry = response.body.features[0].geometry;

    // 🔹 Update listing
    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
        geometry: geometry
    });

    // 🔹 Update image if new uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};