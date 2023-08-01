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

<br>

### 274. Basic Express Server<a id='274'></a>

<br>

### 275. Connect To DB<a id='275'></a>

<br>

### 276. Basic Routes<a id='276'></a>

<br>

### 277. notFound vs ErroHandler Middleware<a id='277'></a>

<br>

### 278. Morgan Package<a id='278'></a>

<br>

### 279. User Model<a id='279'></a>

<br>

### 280. Validator Package<a id='280'></a>

<br>

### 281. Auth Routes Structure<a id='281'></a>

<br>

### 282. Postman Environment Setup<a id='282'></a>

<br>

### 283. Register - Initial Setup<a id='283'></a>

<br>

### 284. Register - Unique Email<a id='284'></a>

<br>

### 285. User Roles<a id='285'></a>

<br>

### 286. Hash Passwords<a id='286'></a>

<br>

### 287. JWT Setup<a id='287'></a>

<br>

### 288. Refactor JWT Setup<a id='288'></a>

<br>

### 289. Cookies Setup<a id='289'></a>

<br>

### 290. Parse Cookies<a id='290'></a>

<br>

### 291. Refactor Cookies Setup<a id='291'></a>

<br>

### 292. Signed and Secure Flags<a id='292'></a>

<br>

### 293. Login Route<a id='293'></a>

<br>

### 294. Logout Route<a id='294'></a>

<br>

### 295. Cookies -Big Picture and "Gotchas"<a id='295'></a>

<br>

### 296. User Routes - Structure<a id='296'></a>

<br>

### 297. User Routes - Postman<a id='297'></a>

<br>

### 298. getAllUsers and getSingleUser<a id='298'></a>

<br>

### 299. Authenticate User - Setup<a id='299'></a>

<br>

### 300. Authenticate User - Complete<a id='300'></a>

<br>

### 301. Authorize Permissions - Setup<a id='301'></a>

<br>

### 302. Authorize Permissions - Complete<a id='302'></a>

<br>

### 303. ShowMe Controller<a id='303'></a>

<br>

### 304. UpdatePassword Controller<a id='304'></a>

<br>

### 305. CreateTokenUser Function<a id='305'></a>

<br>

### 306. UpdateUser Controller - FindOneAndUpdate()<a id='306'></a>

<br>

### 307. UpdateUser Controller - u### ser.sve()<a id='307'></a>

<br>

### 308. CheckPermissions Function<a id='308'></a>

<br>

### 309. Auth Complete<a id='309'></a>

<br>

### 310. Product Model<a id='310'></a>

<br>

### 311. Product Routes - Structure<a id='311'></a>

<br>

### 312. Product Routes - Postman<a id='312'></a>

<br>

### 313. CreateProduct Controller<a id='313'></a>

<br>

### 314. Remaining Product Controllers<a id='314'></a>

<br>

### 315. Upload Image Controller<a id='315'></a>

<br>

### 316. Review Model<a id='316'></a>

<br>

### 317. Review Routes Structure<a id='317'></a>

<br>

### 318. Review Routes - Postman<a id='318'></a>

<br>

### 319. Create Review Controller<a id='319'></a>

<br>

### 320. Get All Reviews and Get Single Review Controller<a id='320'></a>

<br>

### 321. Delete Review Controller<a id='321'></a>

<br>

### 322. Update Review Controller<a id='322'></a>

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

<br>

### 333. Order Structure<a id='333'></a>

<br>

### 334. Order - Postman Setup<a id='334'></a>

<br>

### 335. Create Order - Check Product<a id='335'></a>

<br>

### 336. Create Order - Complete<a id='336'></a>

<br>

### 337. All Order Routes<a id='337'></a>

<br>

### 338. Docgen - Install<a id='338'></a>

<br>

### 339. Docgen - Create Docs<a id='339'></a>

<br>

### 340. Security Packages<a id='340'></a>

<br>

### 341. Deploy on Heroku<a id='341'></a>

<br>

### 342. Small Fixes<a id='342'></a>

<br>

### 343. Deploy To Render<a id='343'></a>

<br>
