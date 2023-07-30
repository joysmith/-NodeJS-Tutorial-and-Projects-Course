# Section 3: Node Tutorial

<br>

#### 9. [REPL](#9.)

#### 10. [CLI](#10)

#### 11. [Source Code](#11)

#### 12. [Globals](#12)

#### 13. [Modules Setup](#13)

#### 14. [First Module](#14)

#### 15. [Alternative Syntax](#15)

#### 16. [Mind Grenade](#16)

#### 17. [Built-in Modules Intro](#17)

#### 18. [OS - Module](#18)

#### 19. [PATH - Module](#19)

#### 20. [FS - Module (sync)](#20)

#### 21. [FS - Module (async)](#21)

#### 22. [Sync vs Async](#22)

#### 23. [HTTP Intro](#23)

#### 24. [HTTP - Module (setup)](#24)

#### 25. [HTTP- Module (more features)](#25)

#### 26. [NPM Info](#26)

#### 27. [NPM Command](#27)

#### 28. [First Packages and package.json](#28)

#### 29. [Share Code on Github](#29)

#### 30. [Nodemon](#30)

#### 31. [Uninstall Package](#31)

#### 32. [Global Install](#32)

#### 33. [package-lock.json](#33)

#### 34. [Important Topics - Intro](#34)

#### 35. [Event Loop - Info](#35)

#### 36. [Event Loopt - Slides](#36)

#### 37. [Event Loop - Code Examples](#37)

#### 38. [Async Patterns - Blocking Code](#38)

#### 39. [Async Patterns - Setup Promises](#39)

#### 40. [Async Patterns - Refactor to Async](#40)

#### 41. [Async Patterns - Node's Native Option](#41)

#### 42. [Events Info](#42)

#### 43. [Events Emitter - Code Example](#43)

#### 44. [Events Emitter - Additional Info](#44)

#### 45. [Events Emitter - HTTP Module Example](#45)

#### 46. [Streams Intro](#46)

#### 47. [Streams - Read File](#47)

#### 48. [Streams - Additional Info](#48)

#### 49. [Streams - HTTP Example](#49)

#### 50. [End Of Module](#50)

---

<br>

### EPL<a id="9"></a>

<br>

### CLI<a id="10"></a>

- How to run js file using node
- navigate to folder using cd-cmd

```sh
      node 01-intro.js
```

<br>

### Source Code<a id="11"></a>

<br>

### Globals<a id="12"></a>

<br>

### Modules Setup<a id="13"></a>

<br>

### First Module<a id="14"></a>

- create 04-names.js-file, in it write code

```js
// local
const secret = "SUPER SECRET";

// share
const john = "john";
const peter = "peter";

module.exports = { john, peter };
```

---

- create 05-utils.js-file, in it write code

```js
const sayHi = (name) => {
  console.log(`Hello there ${name}`);
};

// export default
module.exports = sayHi;
```

---

- create 03-modules.js-file, in it write code

```js
// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require("./04-names");
const sayHi = require("./05-utils");

sayHi("susan");
sayHi(names.john);
sayHi(names.peter);
```

<br>

### Alternative Syntax<a id="15"></a>

- create 04-names.js-file, in it write code

```js
// local
const secret = "SUPER SECRET";

// share
const john = "john";
const peter = "peter";

module.exports = { john, peter };
```

---

- create 05-utils.js-file, in it write code

```js
const sayHi = (name) => {
  console.log(`Hello there ${name}`);
};

// export default
module.exports = sayHi;
```

---

- create 06-alternative-flavour.js-file, in it write code

```js
// another way to export, by using property-items
module.exports.items = ["item1", "item2"];

const person = {
  name: "bob",
};

// another way to export, by using property-singlePerson
module.exports.singlePerson = person;
```

---

- create 03-modules.js-file, in it write code

```js
// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require("./04-names");
const sayHi = require("./05-utils");

const data = require("./06-alternative-flavor");
console.log(data);

sayHi("susan");
sayHi(names.john);
sayHi(names.peter);
```

<br>

### Mind Grenade<a id="16"></a>

- create 07-mind-grenade.js-file, in it write code

```js
const num1 = 5;
const num2 = 10;

function addValues() {
  console.log(`the sum is : ${num1 + num2}`);
}

// invoke function from this module/file
addValues();
```

---

- create 03-modules.js-file, in it write code

```js
// automatically function will invoke
require("./07-mind-grenade");
```

<br>

### Built-in Modules Intro<a id="17"></a>

- Go to nodejs-> DOCS-> v18.17.0API(select recent one)=> [OS](https://nodejs.org/dist/latest-v18.x/docs/api/os.html)

<br>

- OS module
- PATH
- FS
- HTTP

<br>

### OS - Module<a id="18"></a>

- create 08-os-module.js-file, in it write code

```js
// create os-obj
const os = require("os");

// info about current user
const user = os.userInfo();
console.log(user);

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);
```

<br>

### PATH - Module<a id="19"></a>

- create path content/subfolder/first.txt, folders & file

- create 09-path-module.js-file, in it write code

```js
const path = require("path");

console.log(path.sep);

// How to join path for test.txt, which is located in nested folder
const filePath = path.join("/content", "subfolder", "test.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

// How to get absolute path of test.txt-file, which is located in nested folder
const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
console.log(absolute);
```

<br>

### FS - Module (sync)<a id="20"></a>

- In content-folder, create first.txt-file

```txt
Hello this is first text file

```

---

- In content-folder, create second.txt-file

```txt
Hello this is second text file
```

---

- create 10-fs-sync.js-file, write code in it

```js
// destructuring method from fs module
const { readFileSync, writeFileSync } = require("fs");

// How to read file, with utf-8 encoding
const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");

// How to create file & and write something using template literal
writeFileSync(
  "./content/result-sync.txt",
  `Here is the result : ${first}, ${second}`
);

// How to append something in a file
writeFileSync(
  "./content/result-sync.txt",
  `Here is the result : ${first}, ${second}`,
  { flag: "a" }
);

console.log("done with this task");
console.log("starting the next one");
```

<br>

### FS - Module (async)<a id="21"></a>

- In content-folder, create first.txt-file

```txt
Hello this is first text file

```

---

- In content-folder, create second.txt-file

```txt
Hello this is second text file
```

---

- create 11-fs-sync.js-file, write code in it

```js
const { readFile, writeFile } = require("fs");

console.log("start");
readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;
  readFile("./content/second.txt", "utf8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;
    writeFile(
      "./content/result-async.txt",
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done with this task");
      }
    );
  });
});

console.log("starting next task");
```

  <br>

### Sync vs Async<a id="22"></a>

<br>

### HTTP Intro<a id="23"></a>

<br>

### HTTP - Module (setup)<a id="24"></a>

- create 12-http.js-file, setup server in it

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // giant object
  console.log(req);

  res.write("welcome to our server");
  res.end();
});

server.listen(5000);
```

---

- localhost

```sh
http://localhost:5000
```

<br>

### HTTP- Module (more features)<a id="25"></a>

- create 12-http.js-file, setup server in it

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // Home page internet address
  if (req.url === "/") {
    res.end("Welcome to our home page");
  } else if (req.url === "/about") {
    // about page internet address
    res.end("Here is our short history");
  } else {
    // page not found internet address
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `);
  }
});

server.listen(5000);
```

---

- localhost

```sh
http://localhost:5000
```

<br>

### NPM Info<a id="26"></a>

- [NPM](https://www.npmjs.com/)
- Three ways to build an app
  - Build from scratch
  - Google solution copy & paste
  - Go to npm read doc implement feature

<br>

### NPM Command<a id="27"></a>

```sh
# How to check npm version
npm --version

# How to install package as local dependency - only this project
npm i <packageName>

# How to install package as global dependency - in any project
npm install -g <packageName>
```

<br>

### First Packages and package.json<a id="28"></a>

- create project folder
- create app.js then

```sh
# approach: 1 How to create package.json
npm init

# approach: 2 How to create package.json
npm init -y

# extra
npm i lodash
```

<br>

### Share Code on Github<a id="29"></a>

- create .gitignore-file, copy line in it to ignore node_modules upload

```.gitignore
/node_modules
```

<br>

### Nodemon<a id="30"></a>

```sh
# install nodemon as dev-dependency
npm install --save-dev nodemon
# shorthand
npm i nodemon -D

# install nodemon globaly
npm install -g nodemon


# How to start server with nodemon
nodemon app.js
```

---

- How to run with script cmd

```js
{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "1-intro.js",
  "scripts": {
    // modify line
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.20"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}

```

- How to start server

```sh
npm start
```

<br>

### Uninstall Package<a id="31"></a>

```sh
npm uninstall nodemon
```

<br>

### Global Install<a id="32"></a>

```sh
# install nodemon globaly
npm install -g nodemon
```

<br>

### package-lock.json<a id="33"></a>

- package depend on other package registery
- Teardown: "nodemon": "^2.0.7"
- "nodemon": "^2(major update).0(minor update).7(patch or bugfixes)"

<br>

### Important Topics - Intro<a id="34"></a>

<br>

### Event Loop - Info<a id="35"></a>

- [Nodejs event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)

- [Nodejs event loop Browser Youtube](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

- [Nodejs event loop server Youtube](https://www.youtube.com/watch?v=PNa9OMajw9w)

<br>

### Event Loopt - Slides<a id="36"></a>

- [Course API's](https://course-api.com/slides.html)

<br>

### Event Loop - Code Examples<a id="37"></a>

<br>

### Async Patterns - Blocking Code<a id="38"></a>

<br>

### Async Patterns - Setup Promises<a id="39"></a>

<br>

### Async Patterns - Refactor to Async<a id="40"></a>

<br>

### Async Patterns - Node's Native Option<a id="41"></a>

<br>

### Events Info<a id="42"></a>

<br>

### Events Emitter - Code Example<a id="43"></a>

<br>

### Events Emitter - Additional Info<a id="44"></a>

<br>

### Events Emitter - HTTP Module Example<a id="45"></a>

<br>

### Streams Intro<a id="46"></a>

<br>

### Streams - Read File<a id="47"></a>

<br>

### Streams - Additional Info<a id="48"></a>

<br>

### Streams - HTTP Example<a id="49"></a>

<br>

### End Of Module<a id="50"></a>

<br>
