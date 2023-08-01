require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // remove all items from existing database
    await Product.deleteMany();

    // dynamically or automatically create item in db from jsonProducts
    await Product.create(jsonProducts);

    console.log("Success!!!!");

    // terminate the process- 0 everything went well
    process.exit(0);
  } catch (error) {
    console.log(error);

    // terminate the process- 1 everything not went well
    process.exit(1);
  }
};

start();
