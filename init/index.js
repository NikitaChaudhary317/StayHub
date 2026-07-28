const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/stayhub"; // or your DB URL

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  // Format the image property for all seed listings
  const formattedData = initData.data.map((obj) => ({
    ...obj,
    owner: "6a4001527fc95bdda1a7e56c", // Put a valid User _id from your User collection here
    image: typeof obj.image === "string" 
      ? { filename: "listingimage", url: obj.image } 
      : obj.image
  }));

  await Listing.insertMany(formattedData);
  console.log("Data was re-initialized successfully!");
};

initDB();