#### 150. [Intro](#150)

#### 151. [Setup](#151)

#### 152. [Controllers](#152)

#### 153. [Postman Setup](#153)

#### 154. [Validate Username and Password](#154)

#### 155. [JWT - Overview](#155)

#### 156. [JWT - Structure](#156)

#### 157. [JSONWEBTOKEN Package](#157)

#### 158. [Sign JWT](#158)

#### 159. [Bearer Token - Overview](#159)

#### 160. [Send Bearer Token](#160)

#### 161. [Check Auth Header](#161)

#### 162. [Verify Token](#162)

#### 163. [Auth Middleware Setup](#163)

#### 164. [Auth Middleware Complete](#164)

#### 165. [More Error Classes](#165)

#### 166. [Status Codes](#166)

#### 167. [More Refactor - Complete App](#167)

---

<br>

### 150. Intro<a id='150'></a>

<br>

### 151. Setup<a id='151'></a>

- Downaload the starter project

- install dependency and run dev server

```sh
npm install && npm start
```

- to know about new packages used in this project look into package.json
- app.js

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

/* Middleware */
// server frontend
app.use(express.static("./public"));
// for post req, to parse json
app.use(express.json());

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

<br>

### 152. Controllers<a id='152'></a>

- In contollers/main.js, write control logic

```js
const login = async (req, res) => {
  res.send("Fake Login/Register/Signup Route");
};

const dashboard = async (req, res) => {
  // generate random number
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, Jhon Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
```

---

- In routes/main.js, write router logic

```js
const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;
```

---

- In app.js, import router and use it

```js
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// import router
const mainRouter = require("./routes/main");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

/* Middleware */
// server frontend
app.use(express.static("./public"));
// for post req, to parse json
app.use(express.json());

// using route
app.use("/api/v1", mainRouter);

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

<br>

### 153. Postman Setup<a id='153'></a>

- Open postman, create new collection, rename it "05-JWT-Basics"
- create get request route
  - {{URL}}/dashboard
  - make a request
  - save as "Dashboard"

<br>

- create post request route
  - {{URL}}/login
  - select body-> raw-> json write obj

```sh
{
  "username":"jhon",
  "password":"secret"
}
```

- make a request
- save as "Login/Register"

<br>

### 154. Validate Username and Password<a id='154'></a>

- In controller/main.js, write logic to validate username & password

```js
// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  /* 3 way to validate username, password 
  1. mongoose validation
  2. Joi package
  3. check in the controller
  */

  // if username or password not provided throw error
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  res.send("Fake Login/Register/Signup Route");
};

const dashboard = async (req, res) => {
  // generate random number
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, Jhon Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
```

- In postman make a post request, using empty value to test error

```sh
{
  "username":"",
  "password":""
}
```

<br>

### 155. JWT - Overview<a id='155'></a>

<br>

### 156. JWT - Structure<a id='156'></a>

- [JWT](https://jwt.io/)

<br>

### 157. JSONWEBTOKEN Package<a id='157'></a>

- [npm package](https://www.npmjs.com/package/jsonwebtoken)

```sh
npm install jsonwebtoken
```

<br>

### 158. Sign JWT<a id='158'></a>

- In rootlevel create .env file

```js
JWT_SECRET = jwtSecret;
```

---

- In controller/main.js, import jwt,

```js
// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  /* 3 way to validate username, password 
  1. mongoose validation
  2. Joi package
  3. check in the controller
  */

  // if username or password not provided throw error
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // generate random number
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, Jhon Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
```

---

- In postman make a post request, to test it response token

```sh
{
  "username":"jhon",
  "password":"doo"
}
```

<br>

### 159. Bearer Token - Overview<a id='159'></a>

<br>

### 160. Send Bearer Token<a id='160'></a>

<br>

### 161. Check Auth Header<a id='161'></a>

- In controller/main.js,

```js
// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  /* 3 way to validate username, password 
  1. mongoose validation
  2. Joi package
  3. check in the controller
  */

  // if username or password not provided throw error
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  // generate random number
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, Jhon Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
```

---

- Open postman, make post "Login/Register" request
  - copy token number
- Open postman, swith to Header-tab
  - enter

```js
Key                  Value
Authorization        Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJqZXJyeSIsImlhdCI6MTY5MDk2MDc4MSwiZXhwIjoxNjkzNTUyNzgxfQ.FjZvX-v0ClPGpxByNp-s_HBUdGsShW8zWFy5l6HOu-0
```

- make get "Dashboard" request

<br>

### 162. Verify Token<a id='162'></a>

- In controller/main.js

```js
// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  /* 3 way to validate username, password 
  1. mongoose validation
  2. Joi package
  3. check in the controller
  */

  // if username or password not provided throw error
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  // check if authHeader is not empty AND does not start with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // generate random number
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decode.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
```

- open postman make post request and copy token
- make get request by enterning token in "Header"-tab
  <br>

### 163. Auth Middleware Setup<a id='163'></a>

- In middleware/auth.js,

```js
const authenticationMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization);
  next();
};

module.exports = authenticationMiddleware;
```

---

- In routes/main.js

```js

```

<br>

### 164. Auth Middleware Complete<a id='164'></a>

<br>

### 165. More Error Classes<a id='165'></a>

<br>

### 166. Status Codes<a id='166'></a>

<br>

### 167. More Refactor - Complete App<a id='167'></a>

<br>
```;
````
