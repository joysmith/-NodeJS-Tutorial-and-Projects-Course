#### 243. [Intro](#243)

#### 244. [Setup](#244)

#### 245. [Product Model](#245)

#### 246. [Basic Structure](#246)

#### 247. [Postman Setup](#247)

#### 248. [Create Product (Fail)](#248)

#### 249. [Upload Image - Postman](#249)

#### 250. [EXPRESS-FILEUPLOAD Package](#250)

#### 251. [Complete File Upload](#251)

#### 252. [Additional Checks](#252)

#### 253. [Cloudinary Intro](#253)

#### 254. [Cloudinary Setup](#254)

#### 255. [Upload Image to Cloudinary](#255)

#### 256. [Remove Temp Files](#256)

---

<br>

### 243. Intro<a id='243'></a>

<br>

### 244. Setup<a id='244'></a>

- Download the starter project, open with vs-code
- run npm cmd to install all dependency
- create .env file, and setup MONGO_URI
- ren dev server

```sh
npm start
```

<br>

### 245. Product Model<a id='245'></a>

- In models/Product.js, create product schema

```js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
```

<br>

### 246. Basic Structure<a id='246'></a>

-In controllers/productcontroller.js

```js
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  res.send("create products");
};
const getAllProducts = async (req, res) => {
  res.send("list all products");
};

module.exports = {
  createProduct,
  getAllProducts,
};
```

---

-In controllers/uploadcontroller.js

```js
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  res.send("upload product image");
};

module.exports = {
  uploadProductImage,
};
```

---

- In routes/productRoutes.js, write router

```js
const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
```

---

- In app.js add router

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// product router
const productRouter = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

// use router
app.use("/api/v1/products", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 247. Postman Setup<a id='247'></a>

- Open postman, create new collection, rename it "07-file-upload"
- Make a post request
  - {{URL}}/products
  - save as "create product"
- Make a get request
  - {{URL}}/products
  - save as "Get All Products"
- Make a post request
  - {{URL}}/products/uploads
  - save as "Upload Image"

<br>

### 248. Create Product (Fail)<a id='248'></a>

- In controllers/productController.js

```js
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  res.send("list all products");
};

module.exports = {
  createProduct,
  getAllProducts,
};
```

- In post man make a "create product" request
  - body-> raw-> json

```sh
{
    "name":"product name", "price":"300", "image":"123"
}
```

<br>

### 249. Upload Image - Postman<a id='249'></a>

- In controllers/uploadController, add console.log

```js
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  // add console log
  console.log(req);
  res.send("upload product image");
};

module.exports = {
  uploadProductImage,
};
```

---

- Open postman, make a "Upload Image"
  - In tab body-> "form-data"
  - In key select "file", name it image
  - pick file from file system

<br>

### 250. EXPRESS-FILEUPLOAD Package<a id='250'></a>

- [express-fileupload](https://www.npmjs.com/package/express-fileupload)

```sh
npm i express-fileupload
```

-

<br>

### 251. Complete File Upload<a id='251'></a>

- In public-folder create, uploads-subfolder
- In controllers/uploadsControllers.js

```js
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  // add console log
  // console.log(req.files);
  const productImage = req.files.image;
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
```

---

- In app.js

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
// database
const connectDB = require("./db/connect");

// product router
const productRouter = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 252. Additional Checks<a id='252'></a>

<br>

### 253. Cloudinary Intro<a id='253'></a>

<br>

### 254. Cloudinary Setup<a id='254'></a>

<br>

### 255. Upload Image to Cloudinary<a id='255'></a>

<br>

### 256. Remove Temp Files<a id='256'></a>

<br>

---
