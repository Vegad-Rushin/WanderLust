const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middlewear.js");

const userControlller = require("../controllers/users.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/profile")
    .get(isLoggedIn, userControlller.renderProfilePage)
    .post(upload.single("profileImage"), wrapAsync (userControlller.editProfile))

// Signup Routes
router
    .route("/signup")
    .get(userControlller.renderSignupForm)
    .post(wrapAsync( userControlller.signup ))


// Login Routes    
router
    .route("/login")
    .get(userControlller.renderLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local", { 
            failureRedirect : '/',
            failureFlash : true,
        }),
        userControlller.login
    );


router.get("/logout", userControlller.logout);

module.exports = router;