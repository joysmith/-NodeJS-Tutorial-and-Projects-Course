#### 126. [Intro](#126)

#### 127. [Setup](#127)

#### 128. [Basic Express App](#128)

#### 129. [Connect To DB](#129)

#### 130. [Router](#130)

#### 131. [Postman Setup](#131)

#### 132. [EXPRESS-ASYNC-ERRORS](#132)

#### 133. [Product Model](#133)

#### 134. [Populate DB](#134)

#### 135. [Basic Find](#135)

#### 136. [Query Params](#136)

#### 137. [Mongoose V6 Update](#137)

#### 138. [Refactor to QueryObject](#138)

#### 139. [Company](#139)

#### 140. [Name](#140)

#### 141. [Sort - General Setup](#141)

#### 142. [Sort - getAllProducts Implementation](#142)

#### 143. [Select Option](#143)

#### 144. [Skip and Limit - General Info](#144)

#### 145. [Pagination](#145)

#### 146. [Numeric Filters - Setup](#146)

#### 147. [Numeric Filters - Regex](#147)

#### 148. [Numeric Filters - Complete](#148)

#### 149. [Outro](#149)

---

<br>

### 126. Intro<a id='126'></a>

- In [ Algolia Search's API.](https://hn.algolia.com/api) Likeness we will create our api

<br>

### 127. Setup<a id='127'></a>

<br>

### 128. Basic Express App<a id='128'></a>

- Download the starter project, open with vs-code
- run npm cmd to install all dependency

```sh
npm install
```

- To start the dev server run cmd

```sh
npm start
```

---

- In app.js, setup basic express server

```js
require("dotenv").config();
// todo: async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// todo: products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // todo: connectDB
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

- go to local host

```sh
http://localhost:3000
```

<br>

### 129. Connect To DB<a id='129'></a>

- go to mongodb.com, log into account
- account setup
  - orgainization: electronictetris
  - project name: node and express course
  - preffered language: javascript
- create cluster for free
  - aws, select region,
  - cluster name: NodeexpressProject
- Go to, database access tab under security -> add new database user -> password authentication
  - name: john
  - password: 1234
- Database user privileges(built in role)
  - read and write to any database
- ADD user
- Go to Network access tab
  - allow access from anywhere
- Go to Database tab-> connect your application-> mongodb for vs-code
  - copy the string

---

- In rootlevel create .env file and init paste string

```js
MONGO_URI=mongodb+srv://joy:1234@store-api.wqgfx1c.mongodb.net/
```

---

- In app.js import connectDb and use it in async

```js
require("dotenv").config();
// Todo: async errors

const express = require("express");
const app = express();

// import connectdb
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// Todo: products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 130. Router<a id='130'></a>

- In controllers/products.js, create controller logic

```js
const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "product testing route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "product route" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

---

- In routes/products.js, write routes

```js
const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
```

---

- In app.js import route and use route in middleware

```js
require("dotenv").config();
// Todo: async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// import products routes
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// products route
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 131. Postman Setup<a id='131'></a>

- open postman, create collection, rename to "04-Store-API"
- click on eye icon, and setup as gloabl variable

```sh
Variable    initial value            current value
URL         localhost:3000/api/v1    localhost:3000/api/v1
```

- make a get request
- type {{ and select URL
- {{URL}}/products
- click send
- Save as "Get All Products" in 04-Store-API collection

---

- make a get request
- type {{ and select URL
- {{URL}}/products/static
- click send
- Save as "Get All Products -Testing" in 04-Store-API collection

<br>

<br>

### 132. EXPRESS-ASYNC-ERRORS<a id='132'></a>

- In app.js, import async errors

```js
require("dotenv").config();

//  async errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

---

- In controllers/products.js, create a testing error

```js
const getAllProductsStatic = async (req, res) => {
  // throw async error
  throw new Error("testing async errror");

  res.status(200).json({ msg: "product testing route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "product route" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

---

- In postman make a "get all product testing" request, to check custom error

<br>

### 133. Product Model<a id='133'></a>

- In models/products.js create product schema

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // custom error msg
    required: [true, "product name must be provided"],
  },

  price: {
    type: Number,
    // custom error msg
    required: [true, "product price must be provided"],
  },

  featured: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  createdAt: {
    type: Date,
    // auto set date
    default: Date.now(),
  },

  company: {
    type: String,
    enum: {
      // category of all company supported
      values: ["ikea", "liddy", "caressa", "marcos"],
      // custom error msg
      message: "{VALUE} is not supported",
    },
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  },
});

module.exports = mongoose.model("Product", productSchema);
```

<br>

### 134. Populate DB<a id='134'></a>

- In populate.js, write logic to populate items automatically from pre-existing json-list

```js
require("dotenv").config();

const connectDB = require("./db/connect");
// import product schema
const Product = require("./models/product");

// import pre-existing items list
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
```

---

- In terminal run script

```sh
node populate
```

---

NOTE- To populate database first terminate connection, and separately connect to database then populate it

<br>

### 135. Basic Find<a id='135'></a>

- In controllers/products.js, write find query for db

```js
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // how to get all items
  const products = await Product.find({});

  // how to get specific item
  // const products = await Product.find({ name: "vase table" });

  // how to get all featured items
  // const products = await Product.find({ featured: true });

  // response findings with length of array
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "product route" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

- Open postman and make "get all product -testing" request
- ref [find() query](<https://mongoosejs.com/docs/api/model.html#Model.find()>)

<br>

### 136. Query Params<a id='136'></a>

- In controllers/products.js,

```js
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // how to use query param? instead of hard coded key value passing in find()
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

---

- In postman make "Get all products" request using query-param

```sh
{{URL}}/products?featured=true
```

- ref [find() query](<https://mongoosejs.com/docs/api/model.html#Model.find()>)

<br>

### 137. Mongoose V6 Update<a id='137'></a>

<br>

### 138. Refactor to QueryObject<a id='138'></a>

- In controllers/products.js

```js
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // destructuring query
  const { featured } = req.query;
  const queryObject = {};

  // if featured is true then set new property to obj
  if (featured) {
    // add new featured property to queryobject, and set true/false
    queryObject.featured = featured === "true" ? true : false;
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

---

- In postman make "Get all products" request using query-param

```sh
{{URL}}/products?featured=false&page=2
```

<br>

### 139. Company<a id='139'></a>

- In controllers/products.js, add company logic

```js
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // destructuring query
  const { featured, company } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // if company exist
  if (company) {
    // add new company property to queryobject, and assign value of company that we pulling out from query-string
    queryObject.company = company;
  }

  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

---

- In postman make "Get all products" request using query-param

```sh
{{URL}}/products?featured=false&company=ikea
```

<br>

### 140. Name<a id='140'></a>

- In controllers/products.js, add name logic to search any letter in the name

```js
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // destructuring query
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  // if name exist
  if (name) {
    // add new name property to queryobject, using regex mongodb
    queryObject.name = { $regex: name, $options: "i" };
  }

  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```

---

- In postman make "Get all products" request using query-param
  - to search letter in name string

```sh
{{URL}}/products?name=e
```

- ref. [mongodb Query and Projection Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)

<br>

### 141. Sort - General Setup<a id='141'></a>

<br>

### 142. Sort - getAllProducts Implementation<a id='142'></a>

<br>

### 143. Select Option<a id='143'></a>

<br>

### 144. Skip and Limit - General Info<a id='144'></a>

<br>

### 145. Pagination<a id='145'></a>

<br>

### 146. Numeric Filters - Setup<a id='146'></a>

<br>

### 147. Numeric Filters - Regex<a id='147'></a>

<br>

### 148. Numeric Filters - Complete<a id='148'></a>

<br>

### 149. Outro<a id='149'></a>

<br>
