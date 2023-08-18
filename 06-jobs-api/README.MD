#### 168. [Intro](#168)

#### 169. [Setup](#169)

#### 170. [Controllers](#170)

#### 171. [Routes](#171)

#### 172. [Database Connection](#172)

#### 173. [User Schema](#173)

#### 174. [Create User - Basic Setup](#174)

#### 175. [Error Checking - Controller Example](#175)

#### 176. [Hashing Password Info](#176)

#### 177. [Hash User Password](#177)

#### 178. [Mongoose Middleware](#178)

#### 179. [Generate Token - Controller](#179)

#### 180. [Generate Token - Instance Method](#180)

#### 181. [JWT_SECRET and JWT_LIFETIME](#181)

#### 182. [Login Controller Setup](#182)

#### 183. [Compare Password](#183)

#### 184. [Auth Middleware - Setup](#184)

#### 185. [Auth Middleware - Testing](#185)

#### 186. [Alternative Code](#186)

#### 187. [Job Model](#187)

#### 188. [Create Job Route](#188)

#### 189. [Get All Jobs](#189)

#### 190. [Set Token Dynamically in Postman](#190)

#### 191. [Get Single Job](#191)

#### 192. [Update Job](#192)

#### 193. [Remove Job](#193)

#### 194. [Duplicate Error](#194)

#### 195. [Custom Error](#195)

#### 196. [Validation Error](#196)

#### 197. [Cast Error](#197)

#### 198. [Security Info and Packages](#198)

#### 199. [Security Setup](#199)

#### 200. [Additional Info](#200)

#### 201. [Heroku Update !!!](#201)

#### 202. [Heroku Info](#202)

#### 203. [Deploy to Heroku](#203)

#### 204. [Swagger UI Info](#204)

#### 205. [Clone Existing Heroku Project](#205)

#### 206. [Export Postman Docs](#206)

#### 207. [APIMATIC Info](#207)

#### 208. [APIMATIC Setup](#208)

#### 209. [Swagger UI Editor](#209)

#### 210. [Add Swagger UI](#210)

#### 211. [Render Signup](#211)

#### 212. [Github Repo](#212)

#### 213. [Render Deployment](#213)

---

<br>

### 168. Intro<a id='168'></a>

<br>

### 169. Setup<a id='169'></a>

- download the starter template
- install dependencies

```sh
npm install
```

---

- start the dev server

```sh
npm start
```

- you should see "Server is listening ...." text

```sh
http://localhost:3000/
```

<br>

### 170. Controllers<a id='170'></a>

- In controllers/auth.js, write register, login controller function

```js
const register = async (req, res) => {
  res.send("register user");
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

---

- In controllers/jobs.js, write CRUD controller function

```js
const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get job");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const createJob = async (req, res) => {
  res.send("create job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
```

<br>

### 171. Routes<a id='171'></a>

- In routes/auth.js, setup post method to route

```js
const express = require("express");
const router = express.Router();

// import controllers function
const { register, login } = require("../controllers/auth");

// setup routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
```

---

- In routes/jobs.js, setup CRUD method to route

```js
const express = require("express");
const router = express.Router();

// import CRUD function
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require("../controllers/jobs");

// setup routes
router.route("/").post(createJob).get(getAllJobs);

router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
```

---

- In app.js

```js
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// import routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

// TODO:extra packages

// setup routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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

- Open browser to test get route

```sh
http://localhost:3000/api/v1/jobs/

```

<br>

### 172. Database Connection<a id='172'></a>

- create .env in root level and provide correct values
- you can copy from previous project (just change the DB name)

.env

```js
MONGO_URI=mongodb+srv://joy:<password>@store-api.wqgfx1c.mongodb.net/06-JOBS-API
```

---

- In app.js import db

```js
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect DB
const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

// todo: extra packages

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // make mongodb network request
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

### 173. User Schema<a id='173'></a>

- In models/User.js, writing User schema

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    maxlength: 12,
  },
});

module.exports = mongoose.model("User", UserSchema);
```

---

- ref [String mongoose builtin validator](https://mongoosejs.com/docs/schematypes.html#string-validators)

<br>

### 174. Create User - Basic Setup<a id='174'></a>

- open postman, create collection, rename to "06-Jobs-API"
- click on eye icon, and setup as gloabl variable

```sh
Variable    initial value            current value
URL         localhost:3000/api/v1    localhost:3000/api/v1
```

- make a post request
- type {{ and select URL
- {{URL}}/auth/register
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"john@gmail.com",
  "password":"secret"
}
```

- click send
- Save as "Register User" in 06-Jobs-API collection

---

- In controllers/auth.js, import schema, StatusCodes-library

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  // res.send("register user"); // testing
  // res.json(req.body);  // testing

  // create user in mongodb atals
  const user = await User.create({ ...req.body });

  // send response to frontend i.e postman
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

<br>

### 175. Error Checking - Controller Example<a id='175'></a>

- In controllers/auth.js, creat name, email, password are missing validator, inside controller

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  // 1 approach: controller validator
  const { name, email, password } = req.body;
  // if name, email, password are missing throw error
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email, password");
  }

  // 2 approach: mongoose builtin validator
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

---

- Open postman and make "Register User" post request
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"john@gmail.com",
}
```

<br>

### 176. Hashing Password Info<a id='176'></a>

- ref. [bcrypt.js library](https://www.npmjs.com/package/bcryptjs)

- install library

```sh
npm i bcryptjs
```

<br>

### 177. Hash User Password<a id='177'></a>

- In controllers/auth.js, bcrypt password and store to mongodb , also send responde to frontend

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
// import bcrypt
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  // destructuring body
  const { name, email, password } = req.body;
  // generate random bytes with 10 number of rounds
  const salt = await bcrypt.genSalt(10);
  // generating hash password
  const hashedPassword = await bcrypt.hash(password, salt);
  // passing value to key "password: hashedPassword "
  const tempUser = { name, email, password: hashedPassword };
  // store in atlas db
  const user = await User.create({ ...tempUser });

  // send response to frontend i.e postman -testing
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

---

- In models/User.js remove maxlength from password

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    // maxlength: 12,
  },
});

module.exports = mongoose.model("User", UserSchema);
```

- Open postman and make "Register User" post request
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"jenny@gmail.com",
  "password":"secret"
}
```

- Note: ALWAYS ENTER NEW EMAIL NAME

<br>

### 178. Mongoose Middleware<a id='178'></a>

- In models/User.js, import bcrypt use pre-mongoose middleware to hash password

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  //  this refer to this document, password property
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
```

---

- In controllers/auth.js, remove bcrypt import, and password hashing

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

- ref. [Mongoose Middleware Pre(before)](https://mongoosejs.com/docs/middleware.html#pre)

<br>

### 179. Generate Token - Controller<a id='179'></a>

- In controllers/auth.js, import jwt library and send token to postman

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
// import jwt library
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  // generating token
  const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30d",
  });

  // response token to postman
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

<br>

### 180. Generate Token - Instance Method<a id='180'></a>

- In models/User.js, import jwt library, use instance method to create jet token within document

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// mongoose instance method
UserSchema.methods.createJWT = function () {
  // this refer to this document property
  return jwt.sign({ userId: this._id, name: this.name }, "jwtSecret", {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);
```

---

- In controllers/auth.js, remove jwt library, and call instance method to generate token

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  // calling instance method to generate jwt token
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
```

- ref. [mongoose schema instance method](https://mongoosejs.com/docs/guide.html#methods)

<br>

### 181. JWT_SECRET and JWT_LIFETIME<a id='181'></a>

- In .env file, add JWT_SECRET & JWT_LIFETIME

```sh
MONGO_URI=mongodb+srv://joy:1234@store-api.wqgfx1c.mongodb.net/06-JOBS-API
JWT_SECRET=asdfjklqweruiop84*(trtrt
JWT_LIFETIME=30d
```

---

- In models/Users.js, replace hardcoded value with process.env

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET, // jwt_secret
    {
      expiresIn: process.env.JWT_LIFETIME, // jwt_lifetime
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
```

<br>

### 182. Login Controller Setup<a id='182'></a>

- In controllers/auth.js, write login controller function

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  // destructuring email, password
  const { email, password } = req.body;

  //  if email || password are missing, throw error
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // find register email in db
  const user = await User.findOne({ email });

  // if user email is missing db, throw error
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //todo: compare password

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
```

---

- Open postman and create new post route request
- type {{ and select URL
- {{URL}}/auth/login
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"john@gmail.com",
  "password":"secret"
}
```

- click send
- Save as "Login User" in 06-Jobs-API collection

<br>

### 183. Compare Password<a id='183'></a>

- In models/User.js, write instance method to compare password

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// instance method to compare password
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
```

---

- In controllers/auth.js, use instance method to compare password

```js
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  // check password is correct
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
```

---

- Open postman make "Register User" post route request
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"john7@gmail.com",
  "password":"secret"
}
```

- click send

---

- Open postman make "Login User" post route request
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"john7@gmail.com",
  "password":"secret"
}
```

- click send

---

<br>

### 184. Auth Middleware - Setup<a id='184'></a>

- In middleware/authentication.js

```js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
```

<br>

### 185. Auth Middleware - Testing<a id='185'></a>

- In app.js, import authenticateUser middleware and pass to jobs route

```js
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
// import authenticateUser middleware
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
// passing authenticateUser middleware
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

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

---

- In models/Job.js, change res.json

```js
const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get job");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const createJob = async (req, res) => {
  // respone to postman with user crediential
  res.json(req.user);
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
```

---

- NOTE: remove everyting item from atlas mongodband start fresh
- Open postman make "Register User" post route request
- select body-> raw-> json

```js
{
  "name":"jhon",
  "email":"john@gmail.com",
  "password":"secret"
}
```

- click send
- copy token

---

- Open postman and create new post route request
- type {{ and select URL
- {{URL}}/jobs
- select Headers tab

```js
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRmMTVlYzQzMmNjZTMzNmM2YjFmYjMiLCJuYW1lIjoiamhvbiIsImlhdCI6MTY5MjM0MTc0MCwiZXhwIjoxNjk0OTMzNzQwfQ.iZZ5MzYyUsnR9J-CvvAIHT_GIHxo01Stm38pUu7DneI"

}
```

- click send
- save as "Create Job"

<br>

### 186. Alternative Code<a id='186'></a>

<br>

### 187. Job Model<a id='187'></a>

- In Models/Job.js, create Job schema

```js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
```

<br>

### 188. Create Job Route<a id='188'></a>

- Open postman make "Create Job" post route request
- select body-> raw-> json

```js
{
    "company":"google", "position":"intern"
}
```

- click send

---

- In controllers/jobs.js, make a response to postman -testing

```js
const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get job");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const createJob = async (req, res) => {
  // response post to postman
  res.json(req.body);
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
```

---

- In controllers/jobs.js, create job in db

```js
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get job");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

// create job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
```

---

- Open postman make "Create Job" post route request
- select body-> raw-> json

```js
{
    "company":"google", "position":"intern"
}
```

- click send

<br>

### 189. Get All Jobs<a id='189'></a>

- In controllers/jobs.js, create getAllJob logic from db

```js
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// get all jobs from db and sort them to
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  res.send("get job");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
```

---

- Open postman make "Create Job" post route request
- select body-> raw-> json

```js
{
    "company":"apple", "position":"frontend developer"
}
```

- click send

---

- Open postman make "Create Job" post route request
- select body-> raw-> json

```js
{
    "company":"facebook", "position":"fullstack developer"
}
```

- click send

---

- Open postman and create new get route request
- type {{ and select URL
- {{URL}}/jobs
- select Header tab
- from "Register User" route copy token and paste in get route

```js
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRmMTVlYzQzMmNjZTMzNmM2YjFmYjMiLCJuYW1lIjoiamhvbiIsImlhdCI6MTY5MjM1ODgzNiwiZXhwIjoxNjk0OTUwODM2fQ.owxnJsnBylK2nsrSslMhH4PmznAEGI5TiIxpG3uENdA",

}
```

- click send
- Save as "Get All Jobs" in 06-Jobs-API collection

<br>

### 190. Set Token Dynamically in Postman<a id='190'></a>

- Open postman go to "Login User" switch to Tests-tab

```sh
const jsonData = pm.response.json()
pm.globals.set("accessToken", "jsonData.token");
```

- send request, and check global

---

- Open postman go to "Create Job"
- Swith to Header-tab, uncheck Authorization
- Swith to Authorization-tab
  - go to Type and select "Bearer Token"
  - {{accessToken}}

---

- Open postman go to "Get All Jobs"
- Swith to Header-tab, uncheck Authorization
- Swith to Authorization-tab
  - go to Type and select "Bearer Token"
  - {{accessToken}}

---

- Open postman go to "Register User" switch to Tests-tab

```sh
const jsonData = pm.response.json()
pm.globals.set("accessToken", "jsonData.token");
```

- switch to Body-> raw-> json

```js
{
  "name":"peter",
  "email":"peter@gmail.com",
  "password":"secret"
}
```

- send request

<br>

### 191. Get Single Job<a id='191'></a>

<br>

### 192. Update Job<a id='192'></a>

<br>

### 193. Remove Job<a id='193'></a>

<br>

### 194. Duplicate Error<a id='194'></a>

<br>

### 195. Custom Error<a id='195'></a>

<br>

### 196. Validation Error<a id='196'></a>

<br>

### 197. Cast Error<a id='197'></a>

<br>

### 198. Security Info and Packages<a id='198'></a>

<br>

### 199. Security Setup<a id='199'></a>

<br>

### 200. Additional Info<a id='200'></a>

<br>

### 201. Heroku Update !!!<a id='201'></a>

<br>

### 202. Heroku Info<a id='202'></a>

<br>

### 203. Deploy to Heroku<a id='203'></a>

<br>

### 204. Swagger UI Info<a id='204'></a>

<br>

### 205. Clone Existing Heroku Project<a id='205'></a>

<br>

### 206. Export Postman Docs<a id='206'></a>

<br>

### 207. APIMATIC Info<a id='207'></a>

<br>

### 208. APIMATIC Setup<a id='208'></a>

<br>

### 209. Swagger UI Editor<a id='209'></a>

<br>

### 210. Add Swagger UI<a id='210'></a>

<br>

### 211. Render Signup<a id='211'></a>

<br>

### 212. Github Repo<a id='212'></a>

<br>

### 213. Render Deployment<a id='213'></a>

<br>
