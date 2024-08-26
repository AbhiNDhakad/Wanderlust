const mongoose = require("mongoose");
let initData = require("./data.js");
const Listing = require("../models/listing.js");

const main = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    console.log("mongoose connected");
    await initDb();
  } catch (err) {
    console.log(err);
  }
};

const initDb = async () => {
  try {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"66c695edcbd1c82db77a87c5"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  } catch (err) {
    console.log("Error initializing data:", err);
  }
};

main();
  