const Listing = require("../models/listing");
const User = require("../models/user");

module.exports.renderProfilePage = async (req,res) => {
    const listings = await Listing.find({ owner : req.user._id });
    res.render("users/profile.ejs",{ listings });;
};

module.exports.editProfile = async (req,res) => {

    let { username, email } = req.body;

    console.log(req.user._id);

    // let id = res.locals.currUser._id;

    // let editedUser = await User.findByIdAndUpdate(id, {...req.body.user});

    // if(typeof req.file !== "undefined") {
    //     let url = req.file.path;
    //     let filename = req.file.filename;
    //     editedUser.profileImage = {url, filename};        
    // }
    
    
}


module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res) => {
    
    try {
        let {username, email, password} = req.body;

        const newUser = new User({ email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");
        })

    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req,res) => {
    req.flash("success",`Welcome back to Wanderlust!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }

        req.flash("success","You are logged out!");
        res.redirect("/listings");

    })
};