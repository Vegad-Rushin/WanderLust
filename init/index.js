const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); 
// '..' means it goes out form init folder and then it goes into the models folder.

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected Successfully to DB!");
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ( {...obj, owner: "696b1b797ada03d179ed62c8"} ) );
    await Listing.insertMany(initData.data);
    console.log("Data was initialized!");
}

initDB();