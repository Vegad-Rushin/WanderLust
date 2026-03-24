const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Listing = require("../models/listing");

const { isLoggedIn } = require("../middlewear");

// CREATE BOOKING
router.post("/:id/book", isLoggedIn, async (req,res)=>{

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
});


// SHOW USER BOOKINGS
router.get("/", isLoggedIn, async (req,res)=>{

    const bookings = await Booking.find({ user:req.user._id })
        .populate("listing")
        .sort({ checkIn:1 });

    const today = new Date();

    const upcomingBookings = bookings.filter(
        booking => new Date(booking.checkOut) >= today
    );

    const pastBookings = bookings.filter(
        booking => new Date(booking.checkOut) < today
    );

    res.render("bookings/index",{
        upcomingBookings,
        pastBookings
    });

});

module.exports = router;