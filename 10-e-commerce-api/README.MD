#### 272. [Intro](#272)

#### 273. [Setup](#273)

#### 274. [Basic Express Server](#274)

#### 275. [Connect To DB](#275)

#### 276. [Basic Routes](#276)

#### 277. [notFound vs ErroHandler Middleware](#277)

#### 278. [Morgan Package](#278)

#### 279. [User Model](#279)

#### 280. [Validator Package](#280)

#### 281. [Auth Routes Structure](#281)

#### 282. [Postman Environment Setup](#282)

#### 283. [Register - Initial Setup](#283)

#### 284. [Register - Unique Email](#284)

#### 285. [User Roles](#285)

#### 286. [Hash Passwords](#286)

#### 287. [JWT Setup](#287)

#### 288. [Refactor JWT Setup](#288)

#### 289. [Cookies Setup](#289)

#### 290. [Parse Cookies](#290)

#### 291. [Refactor Cookies Setup](#291)

#### 292. [Signed and Secure Flags](#292)

#### 293. [Login Route](#293)

#### 294. [Logout Route](#294)

#### 295. [Cookies -Big Picture and "Gotchas"](#295)

#### 296. [User Routes - Structure](#296)

#### 297. [User Routes - Postman](#297)

#### 298. [getAllUsers and getSingleUser](#298)

#### 299. [Authenticate User - Setup](#299)

#### 300. [Authenticate User - Complete](#300)

#### 301. [Authorize Permissions - Setup](#301)

#### 302. [Authorize Permissions - Complete](#302)

#### 303. [ShowMe Controller](#303)

#### 304. [UpdatePassword Controller](#304)

#### 305. [CreateTokenUser Function](#305)

#### 306. [UpdateUser Controller - FindOneAndUpdate()](#306)

#### 307. [UpdateUser Controller - u#### ser.save()](#307)

#### 308. [CheckPermissions Function](#308)

#### 309. [Auth Complete](#309)

#### 310. [Product Model](#310)

#### 311. [Product Routes - Structure](#311)

#### 312. [Product Routes - Postman](#312)

#### 313. [CreateProduct Controller](#313)

#### 314. [Remaining Product Controllers](#314)

#### 315. [Upload Image Controller](#315)

#### 316. [Review Model](#316)

#### 317. [Review Routes Structure](#317)

#### 318. [Review Routes - Postman](#318)

#### 319. [Create Review Controller](#319)

#### 320. [Get All Reviews and Get Single Review Controller](#320)

#### 321. [Delete Review Controller](#321)

#### 322. [Update Review Controller](#322)

#### 323. [Populate Method](#323)

#### 324. [Mongoose Virtuals](#324)

#### 325. [Alternative Single Product Reviews](#325)

#### 326. [Remove All Reviews](#326)

#### 327. [Aggregate Pipeline - Setup](#327)

#### 328. [Reset Database](#328)

#### 329. [Aggregate Pipeline - Atlas](#329)

#### 330. [Aggregate Pipeline - Review Model](#330)

#### 331. [Additional Group ID Example](#331)

#### 332. [Order Schema](#332)

#### 333. [Order Structure](#333)

#### 334. [Order - Postman Setup](#334)

#### 335. [Create Order - Check Product](#335)

#### 336. [Create Order - Complete](#336)

#### 337. [All Order Routes](#337)

#### 338. [Docgen - Install](#338)

#### 339. [Docgen - Create Docs](#339)

#### 340. [Security Packages](#340)

#### 341. [Deploy on Heroku](#341)

#### 342. [Small Fixes](#342)

#### 343. [Deploy To Render](#343)

---

<br>

### 272. Intro<a id='272'></a>

<br>

### 273. Setup<a id='273'></a>

- download starter project and install dependency & run dev server

```sh
npm install
npm start
```

<br>

### 274. Basic Express Server<a id='274'></a>

- [ ] import express and assign to variable
- [ ] setup start port variable (5000) and start function

- In app.js

```js
// import express and assign to variable
const express = require("express");
const app = express();

// setup start port variable (5000) and start function
const port = process.env.PORT || 5000;
const start = async () => {
  try {
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

### 275. Connect To DB<a id='275'></a>

- [ ] get connection string
  - open atlas mongodb copy vs-code string
- [ ] setup .env with MONGO_URL variable and assign the value

  - create .env file in rootlevel, and setup

  ```js
  MONGO_URL=mongodb+srv://joy:<password>@store-api.wqgfx1c.mongodb.net/10-e-commerce
  ```

  ***

- [ ] import 'dotenv' and setup package
- [ ] import connect() and invoke in the starter

- In app.js

```js
// import dotenv
require("dotenv").config();

const express = require("express");
const app = express();

// import database connect
const connectDB = require("./db/connect");

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // invoke db
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

- [ ] restart the server
- [ ] mongoose V6 info

<br>

### 276. Basic Routes<a id='276'></a>

- [] setup / GET Route
- [] setup express.json() middleware
- [] setup 404 and errorHandler middleware
- [] import 'exress-async-errors' package

- In app.js

```js
require("dotenv").config();
// import express-async-error for controller try & catch
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// import 404, errorHandler middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// setup json() middleware for post and patch request to access body
app.use(express.json());

// setup get route/path for homepage
app.get("/", (req, res) => {
  res.send("e-commerce api");
});

// setup 404, errorHandler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
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

### 277. notFound vs ErroHandler Middleware<a id='277'></a>

- first exress run all the middlware then routes
- we place errorhandler middleware "last" because of express rule

<br>

### 278. Morgan Package<a id='278'></a>

- [Morgan Package](https://www.npmjs.com/package/morgan)
- In app.js

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// rest of the packages
// import morgan package
const morgan = require("morgan");

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// setup morgan middleware
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
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

### 279. User Model<a id='279'></a>

- [] create models folder and init User.js file, in rootlevel
- [] create schema with name,email, password (all type:String)
- [] export mongoose model

- In models/User.js

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
```

<br>

### 280. Validator Package<a id='280'></a>

- [Validator package](https://www.npmjs.com/package/validator)
- [moongoose custon Validator setup](https://mongoosejs.com/docs/validation.html#custom-validators)

- In models/User.js

```js
const mongoose = require("mongoose");
// import validator package
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    // validate custom
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
```

<br>

### 281. Auth Routes Structure<a id='281'></a>

- [] create controllers folder
- [] add authController file
- [] export (register,login,logout) functions
- [] res.send('some string value')

- In controllers/authController.js write

```js
const register = async (req, res) => {
  res.send("register user");
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

- [] create routes folder
- [] setup authRoutes file
- [] import all controllers
- [] setup three routes
- [] post('/register') post('/login') get('/logout')

- In routes/authRoutes.js

```js
const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
```

- [] import authRoutes as authRouter in the app.js
- [] setup app.use('/api/v1/auth', authRouter)

- In app.js

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");

const connectDB = require("./db/connect");

//  import routers
const authRouter = require("./routes/authRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

// setup route middleware
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
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

### 282. Postman Environment Setup<a id='282'></a>

- open postman, click on eye icon, and add environemnt name it "Dev Environment"

```js
{
  variable    initial value                   current value
  URL:        http://localhost:5000/api/v1   http://localhost:5000/api/v1
}
```

- switch environment to "Dev Environment"

---

- create new collection rename it "10-ecommerce"
- add following folder: User, Product, Auth, Review, Order
- In Auth folder, setup following method request
  - get {{URL}}/auth/logout
    - save as "Logout User", send request to test connection
  - post {{URL}}/auth/register
    - save as "Register User", send request to test connection
  - post {{URL}}/auth/login
    - save as "Login User", send request to test connection

<br>

### 283. Register - Initial Setup<a id='283'></a>

- [] create user
- [] send response with entire user (only while testing)

- In controllers/authController.js

```js
// import User model/schema
const User = require("../models/User");
// import StatusCodes
const { StatusCodes } = require("http-status-codes");
// import CustomError
const CustomError = require("../errors");

const register = async (req, res) => {
  // create user
  const user = await User.create(req.body);

  // send response with entire user (only while testing)
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Postman make a "Register User" request
  - select Body-> raw-> JSON

```js
{
  "name": "david",
  "email": "david@gmail.com",
  "password":"secret"
}
```

<br>

### 284. Register - Unique Email<a id='284'></a>

- [] check if email already in use (2 option to do it: schema and controller)

- In models/User.js, option 1 by using schema

```js
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    // email should be unique in db
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
```

---

- In controllers/authController.js, option 2 by setting in controllers

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  // destructure email
  const { email } = req.body;
  //  find email in db
  const emailAlreadyExists = await User.findOne({ email });
  // condition if email exist in db
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Postman make a "Register User" request, to check email duplication error in db
  - select Body-> raw-> JSON

```js
{
  "name": "david",
  "email": "david@gmail.com",
  "password":"secret"
}
```

<br>

### 285. User Roles<a id='285'></a>

- [] ignore 'role'
- [] alternative 'admin' setup

- In controllers/authControllers.js, set admin role

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  // destructuring object
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user will be an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  // condition if first account is set for admin then other registed will be set as user
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Remove all items from collection in Atals mongodb
- Postman make a "Register User" request,
  - select Body-> raw-> JSON

```js
{
  "name": "peter",
  "email": "peter@gmail.com",
  "password":"secret"
}
```

<br>

### 286. Hash Passwords<a id='286'></a>

- [] UserSchema.pre('save') - hook
- this points to User
- bcrypt.genSalt - number of rounds
- bcrypt.hash

- In models/User.js, import bcrypt and hash password, and compare it

```js
const mongoose = require("mongoose");
const validator = require("validator");
// import bcrypt
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// hash password
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
```

---

- Remove all items from collection in Atals mongodb
- Postman make a "Register User" request,
  - select Body-> raw-> JSON

```js
{
  "name": "peter",
  "email": "peter@gmail.com",
  "password":"secret"
}
```

<br>

### 287. JWT Setup<a id='287'></a>

- [] require 'jsonwebtoken' package
- [] create jwt - jwt.sign(payload,secret,options)

- In controllers/authController.js, import jwt , and create web token, also response to server for testing

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// import jwt package
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  // payload for jwtToken
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // create jwt token
  const token = jwt.sign(tokenUser, "jwtSecret", {
    expiresIn: "1d",
  });
  // responding jwt token for testing
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Remove all items from collection in Atals mongodb
- Postman make a "Register User" request
  - select Body-> raw-> JSON

```js
{
  "name": "peter",
  "email": "peter@gmail.com",
  "password":"secret"
}
```

<br>

### 288. Refactor JWT Setup<a id='288'></a>

- [ ] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d

```sh
MONGO_URL=mongodb+srv://joy:1234@store-api.wqgfx1c.mongodb.net/10-e-commerce
JWT_SECRET=jwtSecret
JWT_LIFETIME=1d
```

- [ ] restart the server !!!!

---

- [ ] refactor code, create utils folder in rootlevel and init create jwt.js, and index.js and write jwt functions
- [ ] verify jwt - jwt.verify(token,secret)

- In utils/jwt.js

```js
const jwt = require("jsonwebtoken");

// create jwt
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// verify
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createJWT,
  isTokenValid,
};
```

---

- In utils/index.js, import and export jwt function

```js
const { createJWT, isTokenValid } = require("./jwt");

module.exports = {
  createJWT,
  isTokenValid,
};
```

---

- In controllers/authController.js, import jwt, and create web token

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// import jwt from utils
const { createJWT } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // create jwt token
  const token = createJWT({ payload: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Postman make a "Register User" request
  - select Body-> raw-> JSON

```js
{
  "name": "peter",
  "email": "peter@gmail.com",
  "password":"secret"
}
```

<br>

### 289. Cookies Setup<a id='289'></a>

- [] refactor cookie code
- In controllers/authController.js, setup cookie

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const { createJWT } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenUser });

  // expire time for cookie math
  const oneDay = 1000 * 60 * 60 * 24;
  // create express res.cookie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  // remove token
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Postman make a "Register User" request
  - select Body-> raw-> JSON
  - switch to cookie

```js
{
  "name": "marry",
  "email": "marry@gmail.com",
  "password":"secret"
}
```

<br>

### 290. Parse Cookies<a id='290'></a>

-In app.js, import cookieparser package, setup as middleware, set dummy route to test receive cookie from browser

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
// import cookieParser package
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
// setup cookieParser middleware to access cookie coming back from browser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

// dummy route to test cookie parser log in server
app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

- Open postman, for testing, make a new get request, save as "Testing"
  - {{URL}}
  - check on server console, received back cookie from browser

```js
{
  "name": "larry",
  "email": "larry@gmail.com",
  "password":"secret"
}
```

---

- ref.[cookie-parser](https://www.npmjs.com/package/cookie-parser)

```sh
npm i cookie-parser
```

<br>

### 291. Refactor Cookies Setup<a id='291'></a>

- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response

- In utils/jwt.js

```js
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// setup func attachCookiesToResponse
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
```

---

- In utils/index, import and export function

```js
const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
```

---

- In controllers/authControllers.js refactor

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// const { createJWT } = require("../utils");   ---remove
// import attachCookiesToResponse
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  //      ---------remove-----------
  // const token = createJWT({ payload: tokenUser });
  // const oneDay = 1000 * 60 * 60 * 24;
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  // });

  // accept payload(res, tokenUser)
  attachCookiesToResponse({ res, user: tokenUser });
  // optionally send back the response
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Open postman, make a testing request
  - {{URL}}
  - check on server console, received back cookie from browser

```js
{
  "name": "terry",
  "email": "terry@gmail.com",
  "password":"secret"
}
```

<br>

### 292. Signed and Secure Flags<a id='292'></a>

- In utils/jwt, make setup flags to secure & sign cookie

```js
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // making secure and sined cookie
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
```

---

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
// Making cookie secure
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

// log received cookie in server
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

---

- Postman make a "Register User" request
  - select Body-> raw-> JSON
  - switch to cookie

```js
{
  "name": "tim",
  "email": "tim@gmail.com",
  "password":"secret"
}
```

<br>

### 293. Login Route<a id='293'></a>

- [] check if email and password exist, if one missing return 400
- [] find user, if no user return 401
- [] check password, if does not match return 401
- [] if everything is correct, attach cookie and send back the same response as in register

- In controllers/authController.js,

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  // check if email and password exist, if one missing return 400, destructuring body obj
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  // find user, if no user return 401
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // check password, if does not match return 401
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // if everything is correct, attach cookie and send back the same response as in register
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };
```

---

- Postman make a "Register User" request
  - select Body-> raw-> JSON

```js
{
  "name": "jhon",
  "email": "jhon@gmail.com",
  "password":"secret"
}
```

---

- Postman make a "Login User" request
  - select Body-> raw-> JSON

```js
{
  "email": "jhon@gmail.com",
  "password":"secret"
}
```

<br>

### 294. Logout Route<a id='294'></a>

- [] set token cookie equal to some string value
- [] set expires:new Date(Date.now())

- In controllers/authControllers.js

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  //  set token cookie equal to some string value
  res.cookie("token", "logout", {
    httpOnly: true,
    // set expires:new Date(Date.now())
    expires: new Date(Date.now() + 1000),
  });

  // for development purpose, send response
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = { register, login, logout };
```

---

- Open postman and make a "Logout User" request

<br>

### 295. Cookies -Big Picture and "Gotchas"<a id='295'></a>

<br>

### 296. User Routes - Structure<a id='296'></a>

- [] add userController file
- [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [] res.send('some string value')
- [] setup userRoutes file
- [] import all controllers
- [] setup just one route - router.route('/').get(getAllUsers);
- [] import userRoutes as userRouter in the app.js
- [] setup app.use('/api/v1/users', userRouter)

- In controllers folder create userController.js file

```js
const getAllUsers = async (req, res) => {
  // res.send('some string value')
  res.send("get all user route");
};

const getSingleUser = async (req, res) => {
  res.send(req.params);
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

const updateUserPassword = async (req, res) => {
  res.send(req.body);
};

// export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- In routes folder create userRoutes.js

```js
const express = require("express");
const router = express.Router();

// import all controllers
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

// setup just one route - router.route('/').get(getAllUsers);
router.route("/").get(getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(getSingleUser);

module.exports = router;
```

---

- In app.js import userrouter and use it

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");
// import userRoutes as userRouter in the app.js
const userRouter = require("./routes/userRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

// setup route middleware
app.use("/api/v1/auth", authRouter);
//  setup app.use('/api/v1/users', userRouter)
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
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

### 297. User Routes - Postman<a id='297'></a>

- Open postman, in User folder create routes
- make a get "{{URL}}/users" request save as "Get All Users"
- make a get "{{URL}}/users/123" request save as "Get Single User"
- make a get "{{URL}}/users/showMe" request save as "Show Current User"
- make a patch "{{URL}}/users/updateUser" request save as "Update User"
  - select-> raw-> json

```js
{
  "name":"troy"
}
```

- make a patch "{{URL}}/users/updateUserPassword" request save as "Update User Password"
  - select-> raw-> json

```js
{
  "password":"secret"
}
```

<br>

### 298. getAllUsers and getSingleUser<a id='298'></a>

- [] Get all users where role is 'user' and remove password
- [] Get Single User where id matches id param and remove password
- [] If no user 404

- In controllers/userController.js

```js
//  import User schema, statuscode, customerror
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  // Get all users where role is 'user' and remove password
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  // Get Single User where id matches id param and remove password
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  // condition if user does not exist in db then
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

const updateUserPassword = async (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- Open postman
  - make "Get all user" request, also copy id.
  - make "Get single user" request by pasting id

```sh
{{URL}}/users/64e30b5cb4192273042139ba
```

<br>

### 299. Authenticate User - Setup<a id='299'></a>

- In middleware/authentication.js, write function to check token is present or not

```js
const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  // condition token is missing
  if (!token) {
    console.log("error, no token present");
  } else {
    console.log("token present");
  }

  next();
};

module.exports = {
  authenticateUser,
};
```

---

- In routes/userRoutes.js, setup authentication middleware

```js
const express = require("express");
const router = express.Router();
// import authenticateUser middleware function
const { authenticateUser } = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

// setup middleware to check token
router.route("/").get(authenticateUser, getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

// setup middleware to check token
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
```

---

- Open postman, from Auth-folder
  - make "Logout User" request
  - from User-folder make "Get All User" request, check console
  - from Auth-folder make "Login User" request
  - from User-folder make "Get All User" request, check console

<br>

### 300. Authenticate User - Complete<a id='300'></a>

- In middleware/authenticate.js

```js
const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = {
  authenticateUser,
};
```

---

- Open postman, from Auth-folder
  - from Auth-folder make "Login User" request, login as "admin"
  - from User-folder make "Get All User" request, check console

<br>

### 301. Authorize Permissions - Setup<a id='301'></a>

- [] hardcode (--skipped--)

- In errors folder create unauthorized.js

```js
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
```

---

- In errors/index.js, import & export unauthorized middleware function

```js
const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};
```

---

- In middleware/authentication.js

```js
const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

// authorizePermissions middleware
const authorizePermissions = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new CustomError.UnauthorizedError(
      "Unauthorized to access this route"
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
```

---

- In userRouters.js

```js
const express = require("express");
const router = express.Router();
// import authorizePermissions
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

// setup authorizePermissions after authenticateUser middleware
router.route("/").get(authenticateUser, authorizePermissions, getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
```

- Open postman, from Auth-folder

  - from Auth-folder make "Login User" request, login as "admin"
  - from User-folder make "Get All User" request, check console
  - from Auth-folder make "Login User" request, login as "user" check console
  - from User-folder make "Get All User" request, check console

<br>

### 302. Authorize Permissions - Complete<a id='302'></a>

- [] introduce params

- In middleware/authentication.js

```js
const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

// refactor authorizePermissions
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
```

- In routes/userRouters.js

```js
const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

// introduce params
router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
```

---

- Open postman, from Auth-folder

  - from Auth-folder make "Login User" request, login as "admin"
  - from User-folder make "Get All User" request, check console
  - from Auth-folder make "Login User" request, login as "user" check console
  - from User-folder make "Get All User" request, check console

<br>

### 303. ShowMe Controller<a id='303'></a>

- In routes/userRoutes.js

```js
const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

// authenticateUser middleware setup
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
```

- In controllers/userController.js

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  // res
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

const updateUserPassword = async (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- Open postman, from Auth-folder

  - from Auth-folder make "Login User" request, login as "admin"
  - from User-folder make "Get All User" request, copy id of any, check console
  - from User-folder make "Show Current User" request, by pasting id, check console
  - from Auth-folder make "Login User" request, login as "user"
  - from User-folder make "Get All User" request, check console

<br>

### 304. UpdatePassword Controller<a id='304'></a>

- [] almost identical to login user
- [] add authenticateUser middleware in the route
- [] check for oldPassword and newPassword in the body
- [] if one missing 400
- [] look for user with req.user.userId
- [] check if oldPassword matches with user.comparePassword
- [] if no match 401
- [] if everything good set user.password equal to newPassword
- [] await user.save()

- In routes/userRoutes.js,

```js
const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(updateUser);
// add authenticateUser middleware in the route
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
```

---

- In controllers/userControllers.js

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // check for oldPassword and newPassword in the body
  if (!oldPassword || !newPassword) {
    // if one missing 400
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  // check if oldPassword matches with user.comparePassword
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  // if no match 401
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  // if everything good set user.password equal to newPassword
  user.password = newPassword;

  // await user.save()
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- Open postman, from Auth-folder

- from Auth-folder make "Login User" request, login as "user"
  - select-> raw-> json

```js
{
  "email":"susan@gmail.com",
  "password":"secret"
}
```

---

- from User-folder make "Update User Password" request,
  - select-> raw-> json

```js
{
  "newPassword":"newsecret",
  "oldPassword":"secret"
}
```

---

- from Auth-folder make "Login User" request, login as "user" with old password
  - select-> raw-> json

```js
{
  "email":"susan@gmail.com"
  "password":"secret"
}
```

<br>

### 305. CreateTokenUser Function<a id='305'></a>

- [] create a file in utils (createTokenUser)
- [] setup a function that accepts user object and returns userToken object
- [] export as default
- [] setup all the correct imports/exports and refactor existing code

- In utils folder ceate createTokenUser.js, and setup function

```js
// setup a function that accepts user object and returns userToken object
const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role };
};

// export as default
module.exports = createTokenUser;
```

---

- In utils/index.js, import & export createTokenUser

```js
const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
};
```

---

- In controllers/authControllers.js,

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// import createTokenUser function
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  // use utils createTokenUser
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // use utils createTokenUser
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = { register, login, logout };
```

<br>

### 306. UpdateUser Controller - FindOneAndUpdate()<a id='306'></a>

- [] add authenticateUser middleware in the route
- [] check for name and email in the body
- [] if one is missing, send 400 (optional)
- [] use findOneAndUpdate()
- [] create token user, attachCookiesToResponse and send back the tokenUser

- In routes/userRoutes.js

```js
const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
//  add authenticateUser middleware in the route
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
```

---

- In controllers/userController.js

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// import createTokenUser, attachCookiesToResponse
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// update user
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- Open postman, from Auth-folder

- from Auth-folder make "Login User" request, login as "admin"
  - select-> raw-> json

```js
{
  "email":"jhon@gmail.com",
  "password":"secret"
}
```

---

- from User-folder make "Update User" request
  - select-> raw-> json

```js
{
  "name":"newname",
  "email":"jhon@gmail.com"
}
```

<br>

### 307. UpdateUser Controller - user.save()<a id='307'></a>

- [] user.save()

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- Open postman, from Auth-folder
- from User-folder make "Update User" request
  - select-> raw-> json

```js
{
  "name":"jhon",
  "email":"jhon@gmail.com"
}
```

---

- In models/User.js

```js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  // condition:
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
```

---

- Go to Atlas mongodb and delete all document/records, to make a new admin
- from Auth-folder make "Register User" request,
  - select-> raw-> json

```js
{
  "name":"jhon",
  "email":"jhon@gmail.com",
  "password":"secret"
}
```

---

- from User-folder make "Update User" request
  - select-> raw-> json

```js
{
  "name":"newjhon",
  "email":"jhon@gmail.com"
}
```

---

- from Auth-folder make "Login User" request,
  - select-> raw-> json

```js
{
  "email":"jhon@gmail.com",
  "password":"secret"
}
```

<br>

### 308. CheckPermissions Function<a id='308'></a>

- In utils folder create checkPermissions.js

```js
const CustomError = require("../errors");

const chechPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

module.exports = chechPermissions;
```

---

- In utils/index.js, import & export checkPermissions function

```js
const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
// import checkPermissions
const checkPermissions = require("./checkPermissions");
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  // export checkPermissions
  checkPermissions,
};
```

---

- In controllers/userController.js

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// import checkPermissions
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }

  // check permissions to view other user
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
```

---

- Open postman, Make "Register User" request and register 5 new users one by one

```js
{
  "name": "sam",
  "email": "sam@gmail.com",
  "password":"secret"
}

{
  "name": "anna",
  "email": "anna@gmail.com",
  "password":"secret"
}

{
  "name": "jerry",
  "email": "jerry@gmail.com",
  "password":"secret"
}

{
  "name": "smith",
  "email": "smith@gmail.com",
  "password":"secret"
}

{
  "name": "peter",
  "email": "peter@gmail.com",
  "password":"secret"
}
```

- from Auth-folder make "Login User" request, as admin
  - select-> raw-> json

```js
{
  "email":"jhon@gmail.com",
  "password":"secret"
}
```

---

- from User-folder make "Get All User" request
- copy any id

---

- from Auth-folder make "Login User" request
  - select-> raw-> json

```js
{
  "name":"anna",
  "email":"anna@gmail.com"
}
```

---

- from User-folder make "Get Single User" request, by pasting id

<br>

### 309. Auth Complete<a id='309'></a>

<br>

### 310. Product Model<a id='310'></a>

- [] create Product.js in models folder
- [] create Schema
- [] name : {type:String}
- [] price: {type:Number}
- [] description: {type:String}
- [] image: {type:String}
- [] category: {type:String}
- [] company: {type:String}
- [] colors: {type:[]}
- [] featured: {type:Boolean}
- [] freeShipping: {type:Boolean}
- [] inventory:{type:Number}
- [] averageRating:{type:Number}
- [] user
- [] set timestamps
- [] export Product model

- In models folder create Products.js

```js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  // Nested Object
  {
    name: {
      type: String,
      // remove any white space
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },

    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },

    image: {
      type: String,
      // use default image to upload, in case user not provide
      default: "/uploads/example.jpeg",
    },

    category: {
      type: String,
      required: [true, "Please provide product category"],
      // 1 way to setup enum as array
      enum: ["office", "kitchen", "bedroom"],
    },

    company: {
      type: String,
      required: [true, "Please provide company"],
      // 2 way to setup enum as object, by accessing value
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },

    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    inventory: {
      type: Number,
      required: true,
      default: 15,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
```

<br>

### 311. Product Routes - Structure<a id='311'></a>

- [] add productController file in controllers
- [] export (createProduct, getAllProducts,
  getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
- [] res.send('function name')
- [] setup productRoutes file in routes
- [] import all controllers
- [] only getAllProducts and getSingleProduct accessible to public
- [] rest only by admin (setup middlewares)
- [] typical setup
- [] router.route('/uploadImage').post(uploadImage)
- [] import productRoutes as productRouter in the app.js
- [] setup app.use('/api/v1/products', productRouter)

- In controllers folder create productController.js, create 6 controllers

```js
const createProduct = async (req, res) => {
  res.send("create product");
};

const getAllProducts = async (req, res) => {
  res.send("get all product");
};
const getSingleProduct = async (req, res) => {
  res.send("get single product");
};

const updateProduct = async (req, res) => {
  res.send("update product");
};
const deleteProduct = async (req, res) => {
  res.send("delete product");
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
```

---

- In routes folder create productRoutes.js,

```js
// took 3 import from userRoutes setup, copy & paste
const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts); // accessible to public

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

// wildcard route always write in botton -express rule
router
  .route("/:id")
  .get(getSingleProduct) // accessible to public
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

module.exports = router;
```

---

- In app.js

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");

//  import productrouter
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

// setup product route middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
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

### 312. Product Routes - Postman<a id='312'></a>

- Open postman, make "Login User" request and log in as admin
- In Product folder, setup following method request

---

- get "{{URL}}/products"
  - save as "Get All Products", in ecommerce inside Product-folder, send request to test connection

---

- post "{{URL}}/products"
  - save as "Create Product", send request to test connection

---

- get "{{URL}}/products/id_123"
  - save as "Get Single Products", send request to test connection

---

- patch "{{URL}}/products/id_123"
  - save as "Update Products", send request to test connection

---

- delete "{{URL}}/products/id_123"
  - save as "Delete Products", send request to test connection

---

- post "{{URL}}/products/uploadImage"
  - save as "Upload Image", send request to test connection

<br>

### 313. CreateProduct Controller<a id='313'></a>

- [] create user property on req.body and set it equal to userId (req.user)
- [] pass req.body into Product.create
- [] send back the product

- In controllers/productController.js

```js
// import Product, statuscodes, custom error
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// create product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.send("get all product");
};
const getSingleProduct = async (req, res) => {
  res.send("get single product");
};

const updateProduct = async (req, res) => {
  res.send("update product");
};
const deleteProduct = async (req, res) => {
  res.send("delete product");
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
```

---

- Open postman, make "Login User" request and log in as admin
- In Product folder, make "Create Product" request
  - select-> raw ->json
  - use mockdata
  - NOTE- not to write everything because we setup default value

```js
 {
    "name": "testing produc",
    "company": "marcos",
    "description": "some description",
    "category": "office"
  }
```

<br>

### 314. Remaining Product Controllers<a id='314'></a>

- [] getAllProducts
- [] getSingleProduct
- [] updateProduct
- [] deleteProduct
- [] typical CRUD, utilize (task or job) project
- [] remember we check already for role 'admin'

- In controllers/productController.js

```js
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  // condition if product doesn't exist
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const uploadImage = async (req, res) => {
  res.send("upload Image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
```

- Open postman, make "Login User" request and log in as admin
- In Product folder, make "Get All Products" request, copy id any one
- In Product folder, make "Get Single Product" request, by pasting id
- In Product folder, make "Update Product" request, by pasting id

```js
 {
    "name": "new testing product",
  }
```

- In Product folder, make "Delete Product" request, by pasting id

<br>

### 315. Upload Image Controller<a id='315'></a>

- [] if some question, re-watch 07-file-upload
- [] images folder with two images

- create public folder in rootlevel, inside public-folder create uploads-subfolder
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)

```js
npm i express-fileupload
```

- In app.js import

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// import fileUpload file package
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// setup publi, fileUpload middleware
app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

---

- copy and paste "example.png" image in public/uploads from google image
- Open postman, make "Login User" request and log in as admin
- In Product folder, make "Create Products" request,

```js
{
    "name": "armchair1",
    "company": "marcos",
    "description": "Cloud ",
    "category": "bedroom"
  }

```

- go to localhost "http://localhost:5000/uploads/example.jpeg"

---

- In controllers/productController.js

```js
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const uploadImage = async (req, res) => {
  // for testing
  console.log(req.files);
  res.send("upload image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
```

---

- Open postman,In Auth-folder make "Login User" request and log in as admin
- In Product folder, make "Upload Image" request, check terminal
  - select-> body-> form-data->

```sh
KEY(File)   Select Files
image

```

---

- Controllers/productControllers.js

```js
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const uploadImage = async (req, res) => {
  // condition: if there is no file
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  // condition: check mime type property, if its not image trow error
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  // condition : image size is maximum throw error
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  //
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  // upload image
  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
```

- Open postman,In Auth-folder make "Login User" request and log in as admin
- In Product folder, make "Upload Image" request, check terminal
  - select-> body-> form-data->
  - check project folder public/upload

```sh
KEY(File)   Select Files
image

```

<br>

### 316. Review Model<a id='316'></a>

- [] create Review.js in models folder
- [] create Schema
- [] rating : {type:Number}
- [] title: {type:String}
- [] comment: {type:String}
- [] user
- [] product
- [] set timestamps
- [] export Review model

- In controllers folder create, Review.js
- Note: the user will write review on product

```js
const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },

    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },

    comment: {
      type: String,
      required: [true, "Please provide review text"],
    },

    // reference user id
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    // reference product id
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },

  { timestamps: true }
);

// user can leave one revie on 1 product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
```

<br>

### 317. Review Routes Structure<a id='317'></a>

- [] add reviewController file in controllers
- [] export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
- [] res.send('function name')
- [] setup reviewRoutes file in routes
- [] import all controllers
- [] only getAllReviews and getSingleReview accessible to public
- [] rest only to users (setup middleware)
- [] typical REST setup
- [] import reviewRoutes as reviewRouter in the app.js
- [] setup app.use('/api/v1/reviews', reviewRouter)

<br>

### 318. Review Routes - Postman<a id='318'></a>

<br>

### 319. Create Review Controller<a id='319'></a>

- [] check for product in the req.body
- [] attach user property (set it equal to req.user.userId) on to req.body
- [] create review
- [] don't test yet

<br>

### 320. Get All Reviews and Get Single Review Controller<a id='320'></a>

- [] both public routes, typical setup

<br>

### 321. Delete Review Controller<a id='321'></a>

- [] get id from req.params
- [] check if review exists
- [] if no review, 404
- [] check permissions (req.user, review.user)
- [] use await review.remove()
- [] send back 200

<br>

### 322. Update Review Controller<a id='322'></a>

- [] get id from req.params
- [] get {rating, title comment} from req.body
- [] check if review exists
- [] if no review, 404
- [] check permissions
- [] set review properties equal to rating, title, comment
- [] use await review.save()
- [] send back 200

<br>

### 323. Populate Method<a id='323'></a>

<br>

### 324. Mongoose Virtuals<a id='324'></a>

<br>

### 325. Alternative Single Product Reviews<a id='325'></a>

<br>

### 326. Remove All Reviews<a id='326'></a>

<br>

### 327. Aggregate Pipeline - Setup<a id='327'></a>

<br>

### 328. Reset Database<a id='328'></a>

<br>

### 329. Aggregate Pipeline - Atlas<a id='329'></a>

<br>

### 330. Aggregate Pipeline - Review Model<a id='330'></a>

<br>

### 331. Additional Group ID Example<a id='331'></a>

<br>

### 332. Order Schema<a id='332'></a>

- [] create Order.js in models folder
- [] create Schema
- [] tax : {type:Number}
- [] shippingFee: {type:Number}
- [] subtotal: {type:Number}
- [] total: {type:Number}
- [] orderItems:[]
- [] status:{type:String}
- [] user
- [] clientSecret:{type:String}
- [] paymentId:{type:String}
- [] set timestamps
- [] export Order model

<br>

### 333. Order Structure<a id='333'></a>

- [] add orderController file in controllers
- [] export (getAllOrders, getSingleOrder, getCurrentUserOrders,
  createOrder, updateOrder) functions
- [] res.send('function name')
- [] setup orderRoutes file in routes
- [] import all controllers
- [] authenticate user in all routes
- [] getAllOrders admin only
- [] typical REST setup
- [] router.route('/showAllMyOrders').get(getCurrentUserOrders)
- [] import orderRoutes as orderRouter in the app.js
- [] setup app.use('/api/v1/orders', orderRouter)

<br>

### 334. Order - Postman Setup<a id='334'></a>

<br>

### 335. Create Order - Check Product<a id='335'></a>

- [] most complex

<br>

### 336. Create Order - Complete<a id='336'></a>

- [] getAllOrders - admin only
- [] getSingleOrder - chechPermissions

<br>

### 337. All Order Routes<a id='337'></a>

- [] get order id
- [] get paymentIntentId (req.body)
- [] get order
- [] if does not exist - 404
- [] check permissions
- [] set paymentIntentId and status as 'paid'
- [] order.save()

<br>

### 338. Docgen - Install<a id='338'></a>

<br>

### 339. Docgen - Create Docs<a id='339'></a>

- [] [Docgen Library] (https://github.com/thedevsaddam/docgen)
- [] Export Postman Collection
- [] docgen build -i fileName.json -o index.html
- [] create index.html in public

<br>

### 340. Security Packages<a id='340'></a>

- [] express-rate-limiter
- [] helmet
- [] xss-clean
- [] express-mongo-sanitize
- [] cors (cookies!!!!)

<br>

### 341. Deploy on Heroku<a id='341'></a>

- [] heroku account and heroku cli
- [] remove/copy from the main repo
- [] add dev command "nodemon app.js"
- [] change start to "node app.js"
- [] setup node version in package.json
- [] "engines": {"node": "14.x"}
- [] Procfile "web: node app.js"
- [] remove existing git repo
- [] rm -rf .git - mac,
- [] git init
- [] git add .
- [] git commit -m "initial commit"
- [] heroku login
- [] heroku create "App Name"
- [] git remote -v
- [] setup env vars in GUI
- [] git push heroku master/main

<br>

### 342. Small Fixes<a id='342'></a>

<br>

### 343. Deploy To Render<a id='343'></a>

<br>
