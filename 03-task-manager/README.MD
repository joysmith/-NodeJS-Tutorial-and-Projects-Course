#### 88. [Intro](#88)

#### 89. [Setup](#89)

#### 90. [Basic Express Server](#90)

#### 91. [General Routes](#91)

#### 92. [Route Structure and Details](#92)

#### 93. [getAllTasks](#93)

#### 94. [All Routes](#94)

#### 95. [Postman Setup](#95)

#### 96. [REST](#96)

#### 97. [MongoDB Intro](#97)

#### 98. [Atlas Setup](#98)

#### 99. [DB, Network Access and Connection String](#99)

#### 100. [Additional Info](#100)

#### 101. [MongoDB Overview](#101)

#### 102. [CRUD - GUI Example](#102)

#### 103. [Mongoose Info](#103)

#### 104. [Connect To DB](#104)

#### 105. [Refactor Connect](#105)

#### 106. [ENV VARS](#106)

#### 107. [First Schema and Model](#107)

#### 108. [Create Task](#108)

#### 109. [Schema Info](#109)

#### 110. [Basic Validation](#110)

#### 111. [TRY/CATCH Block](#111)

#### 112. [getAllTasks Controller](#112)

#### 113. [getSingleTask](#113)

#### 114. [Two Errors](#114)

#### 115. [Delete Task](#115)

#### 116. [Update Task](#116)

#### 117. [Add Front-End](#117)

#### 118. [PUT VS PATCH](#118)

#### 119. [Response Types](#119)

#### 120. [NOT FOUND](#120)

#### 121. [Async Wrapper](#121)

#### 122. [Custom Error Handler](#122)

#### 123. [Custom Error Class](#123)

#### 124. [PORT Variable](#124)

#### 125. [Outro](#125)

---

<br>

### 88. Intro<a id='88'></a>

<br>

### 89. Setup<a id='89'></a>

<br>

### 90. Basic Express Server<a id='90'></a>

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
// import express package
const express = require("express");
const app = express();

// routes
app.get("/hello", (req, res) => {
  // send simple html response
  res.send("Task Manager App");
});

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
```

- go to local host

```sh
http://localhost:3000/hello
```

<br>

### 91. General Routes<a id='91'></a>

- get all task route
- post a single task route
- get route with params, for single task
- patch route with params, for single task
- delete route with params, for single task

<img src="notes/routes.png" width="400">

<br>

### 92. Route Structure and Details<a id='92'></a>

- In [ Algolia Search's API.](https://hn.algolia.com/api) Likeness we will create our api

<br>

### 93. getAllTasks<a id='93'></a>

- create routes & controller-folders in root level
- In routes-folder create tasks.js-file
- In controller-folder create tasks.js-file
- In routes/tasks.js, write route

```js
const express = require("express");
// invoking router
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("all items");
});

module.exports = router;
```

---

- In app.js, import router and setup middleware

```js
const express = require("express");
const app = express();

// import get route from router
const tasks = require("./routes/tasks");

// to access json post data from req.body
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

// pass tasks route in middlware
app.use("/api/v1/tasks", tasks);

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
```

---

- go to local host

```sh
http://localhost:3000/api/v1/tasks
```

---

- In controllers/tasks.js, move callback logic from routes/task.js to here and export

```js
const getAllTasks = (req, res) => {
  res.send("all items");
};

module.exports = { getAllTasks };
```

---

- In routes/taks.js import callback controller logic

```js
const express = require("express");
const router = express.Router();

// import controller logic
const { getAllTasks } = require("../controllers/tasks");

// pass callback controller logic
router.route("/").get(getAllTasks);

module.exports = router;
```

---

- go to local host

```sh
http://localhost:3000/api/v1/tasks
```

<br>

### 94. All Routes<a id='94'></a>

- In controller/tasks.js, write callback CRUD logic for all routes

```js
const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

// create
const createTask = (req, res) => {
  res.send("create task");
};

// retrive
const getTask = (req, res) => {
  res.send("get single task");
};

// update
const updateTask = (req, res) => {
  res.send("update task");
};

// delete
const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

---

- In routes/tasks.js, import all callback-logic from controller and pass routes

```js
const express = require("express");
const router = express.Router();

// import all callback-logic from controller
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// setup routes
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
```

- In CRUD C = create, we do "post" request to create something

<br>

### 95. Postman Setup<a id='95'></a>

- open postman, create collection, rename to "03-Task-Manager"
- click on eye icon, and setup as gloabl variable

```sh
Variable    initial value            current value
URL         localhost:3000/api/v1    localhost:3000/api/v1
```

- make a get request
- type {{ and select URL
- {{URL}}/tasks
- click send
- Save as "Get All Tasks" in 03-Task Manager-collection

---

<br>

- make a post request
- type {{ and select URL
- {{URL}}/tasks
- click on tab body-> raw-> switch to json, write object

```js
    {
      "name":"shake and bake",
      "completed": true
    }
```

- check-out callback are working, In contoller/tasks.js

```js
const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

// replace send with json response
const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  res.send("get single task");
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- click send
- Save as "Create Task" in 03-Task Manager-collection

---

<br>

- make a get request
- type {{ and select URL
- {{URL}}/tasks/idxyz
- checking out params aka wildcard aka placeholder. In controller/tasks.js

```js
const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

const createTask = (req, res) => {
  res.json(req.body);
};

// replace send with json response
const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- click send
- Save as "Get Single Task" in 03-Task Manager-collection

---

<br>

- Make patch request
- type {{ and select URL
- {{URL}}/tasks/123
- click send
- Save as "Update Task" in 03-Task Manager-collection

---

<br>

- Make delete request
- type {{ and select URL
- {{URL}}/tasks/idname
- click send
- save as "Delete Task" in 03-Task Manager-collection

---

<br>

### 96. REST<a id='96'></a>

- CRUD: create read update destroy
- REST api is a design pattern, that combine http verbs, route path, and resources aka data

<img src="notes/restapi.png" width="400">

<br>

### 97. MongoDB Intro<a id='97'></a>

- store json
- instead of tables we have collection which represent group of items
- instead of row we have documents which represent single item

<br>

### 98. Atlas Setup<a id='98'></a>

- go to mongodb.com, create an account
- account setup
  - orgainization: electronictetris
  - project name: node and express course
  - preffered language: javascript
- create cluster for free
  - aws, select region,
  - cluster name: NodeexpressProject

 <br>

### 99. DB, Network Access and Connection String<a id='99'></a>

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
- Create new db-folder in rootlevel, and create connect.js, and write

```js
const connectionString = "paste here connection string from mongo db";
```

<br>

- setting database name in connectionString

<img src="notes/db.png" width="800">

<br>

### 100. Additional Info<a id='100'></a>

<br>

<br>

### 101. MongoDB Overview<a id='101'></a>

- Termilogy
  - Database(store): file name
  - Collection(Products): json file
  - Document(items): single item or obj

<br>

### 102. CRUD - GUI Example<a id='102'></a>

- create item/product
- read item/product
- update item/product
- delete item/product

<br>

### 103. Mongoose Info<a id='103'></a>

- object data modilling library [Mongoose](https://www.npmjs.com/package/mongoose)
- install mangoose

```
npm install mongoose@5.11.10
```

<br>

### 104. Connect To DB<a id='104'></a>

- In db/connect.js, import moongoose package & connect to db
- Note- in mongoose version7 dont need to pass obj setting in connect
  - The version i'm using is "mongoose": "^5.11.10"

```js
// import mongoose package
const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://joy:1234@nodeexpressproject.ea0my0k.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the db..."))
  .catch(() => {
    console.log(err);
  });

// mongoose 7 version setting, no need to pass setting in connect
// mongoose
//   .connect(connectionString)
//   .then(() => console.log("Connected to the db..."))
//   .catch(() => {
//     console.log(err);
//   });
```

---

- In app.js, import moongoose

```js
// temporary connect for testing
require("./db/connect");

const express = require("express");
const app = express();

const tasks = require("./routes/tasks");

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

// setup tasks route middlware
app.use("/api/v1/tasks", tasks);

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
```

<br>

### 105. Refactor Connect<a id='105'></a>

- In db/connect.js, refactor code into callback function

```js
const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://joy:1234@nodeexpressproject.ea0my0k.mongodb.net/?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
```

---

- In app.js, import mongoose connect, and invoke inside start

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

// import mongoose connect db
const connectDB = require("./db/connect");

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

// setup tasks route middlware
app.use("/api/v1/tasks", tasks);

const port = 3000;

// function
const start = async () => {
  try {
    // first connect the mongodb server
    await connectDB();
    //  second run the app.js server
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 106. ENV VARS<a id='106'></a>

- install dotenv dependency

```sh
npm install dotenv --save
```

- setup .env in .gitignore file

```sh
/node_modules
.env
```

- create .env-file in root level, in it pluck connection string from connect.js

```.env
MONGO_URI= mongodb+srv://joy:1234@nodeexpressproject.ea0my0k.mongodb.net/?retryWrites=true&w=majority
```

---

- In db/connect.js refactor

```js
const mongoose = require("mongoose");

const connectDB = (url) => {
  // replace connectionString with url
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
```

---

- In app.js, import dotenv package and pass MONGO_URI in connectDB

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

// 1 bring dotenv
require("dotenv").config();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    // 2 passing dotenv credential
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 107. First Schema and Model<a id='107'></a>

- Create models-folder in root level, in it create Task.js-file, and write schema using mongoose constructor

```js
const mongoose = require("mongoose");

// mongoose constructor for creating schema
const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
```

- [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)

<br>

### 108. Create Task<a id='108'></a>

- In controllers/tasks.js, import model, and create task/item on atlasdb server

```js
// import task model
const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

// making async callback function
const createTask = async (req, res) => {
  // create task/item on atlas-mongo-db server
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- go to post man and make a "Create Task" post request

<br>

### 109. Schema Info<a id='109'></a>

<br>

### 110. Basic Validation<a id='110'></a>

- In models/Task.js, adding built-in mongoose validator

```js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    // remove spaces
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },

  completed: {
    type: Boolean,
    // set default value of boolean to false
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
```

- OPen postman, make "create Task" post request
- Mongoose built-in [Validation](https://mongoosejs.com/docs/validation.html)

<br>

### 111. TRY/CATCH Block<a id='111'></a>

- In controller/tasks.js

```js
const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

const createTask = async (req, res) => {
  // moveing code in try catch block
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    // response general error, instead of making user hanging
    res.status(500).json({ msg: error });
  }
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- open postman, make "create task" post request

<br>

### 112. getAllTasks Controller<a id='112'></a>

- In controllers/tasks.js, turn getAllTasks callback into async callback

```js
const Task = require("../models/Task");

// turn into async callback function
const getAllTasks = async (req, res) => {
  try {
    // get all task/item from atlas-mongo-db server
    const tasks = await Task.find({});

    // res.status(200).json({ tasks: tasks });
    res.status(200).json({ tasks }); // ES6 shorthand feature
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- Open postman, make a "get all task" request
- [Model.find()](<https://mongoosejs.com/docs/api/model.html#Model.find()>) query

<br>

### 113. getSingleTask<a id='113'></a>

- In controller/taks.js, turn getTask() into async callback,

```js
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// turn into async callback function
const getTask = async (req, res) => {
  try {
    // destructing params and giving alias "taskID" at the same time
    const { id: taskID } = req.params;

    // get single task/item from atlas-mongo-db server
    const task = await Task.findOne({ _id: taskID });

    // check: if task is null, means task/item doesn't exist in collections, then
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- Open postman make "get all task" request, copy id of any one task
- make a "single task" request by pasting id on url route
- [Model.findOne()](<https://mongoosejs.com/docs/api/model.html#Model.findOne()>) query

<br>

### 114. Two Errors<a id='114'></a>

<br>

### 115. Delete Task<a id='115'></a>

- In controllers/task.js, turn deleteTask() into async callback

```js
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = (req, res) => {
  res.send("update task");
};

/* delete task turn into async callback function*/
const deleteTask = async (req, res) => {
  try {
    // destructing params and giving alias "taskID" at the same time
    const { id: taskID } = req.params;
    // get single task/item from atlas-mongo-db server
    const task = await Task.findOneAndDelete({ _id: taskID });
    // check: if task is null, means task/item doesn't exist in collections, then
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- open postman make "get all tasks" request, copy id of anyone item
- make a "delete task" request by pasting ID as param
- [Model.findOneAndDelete()](<https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()>) query

<br>

### 116. Update Task<a id='116'></a>

- In controller/task.js, turn updateTask() into async callback

```js
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* update task turn into async callback function*/
const updateTask = async (req, res) => {
  try {
    // destructing params and giving alias "taskID" at the same time
    const { id: taskID } = req.params;

    // get single task/item from atlas-mongo-db server and update with new item
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    // check: if task is null, means task/item doesn't exist in collections, then
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- go to postman, make get all task request, copy any id
- select tab body-> raw-> json, write obj

```sh
 {
      "name":"laptop",
      "completed": true
  }
```

- make "update request", by pasting as param

- [Model.findByIdAndUpdate()](<https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()>)

<br>

### 117. Add Front-End<a id='117'></a>

- In app.js, add middleware to serve static files

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware serving static files
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

<br>

### 118. PUT VS PATCH<a id='118'></a>

<br>

### 119. Response Types<a id='119'></a>

- In controllers/task.js, different option for response to frontend\

<img src="notes/response.png" width="400">

<br>

### 120. NOT FOUND<a id='120'></a>

- In root level create middleware-folder, in it create not-found.js

```js
const notFound = (req, res) => res.status(404).send("Route does not exist");

module.exports = notFound;
```

---

- In app.js, import not-found and use in middleware

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// import not found
const notFound = require("./middleware/not-found");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

// 404 page not found add in middleware
app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

- test in postman everything is working or not

<br>

### 121. Async Wrapper<a id='121'></a>

- In middleware-folder create async.js, write wrapper function to wrap our controllers

```js
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
```

---

- In controllers/task.js refactor by wrapping asyncWrapper and removing try and catch block

```js
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  // get all task
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  // create task
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// edit fron send to json
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }

  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
```

- test in postman everything is working or not

<br>

### 122. Custom Error Handler<a id='122'></a>

- In middleware folder, create error-handler.js, and write

```js
const errorHandlerMiddleware = (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
```

- In app.js import error-handler and use in middleware

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// import errorhandler
const errorHandlerMiddleware = require("./middleware/error-handler");

const notFound = require("./middleware/not-found");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);

// error handler
app.use(errorHandlerMiddleware);
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

- go to postman, make an update request with empty value ""

```js
  {
      "name":"",
      "completed": true
  }
```

- [Writing error handlers](https://expressjs.com/en/guide/error-handling.html#writing-error-handlers)

<br>

### 123. Custom Error Class<a id='123'></a>

<br>

### 124. PORT Variable<a id='124'></a>

- In app.js, setup port variable using environmental variable

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");

const notFound = require("./middleware/not-found");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandlerMiddleware);

// set port by environment variable and if nothing there set by 3000
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

---

- stop server and run

```sh
node app.js set PORT=6000
```

<br>

### 125. Outro<a id='125'></a>

<br>
````
