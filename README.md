# Web Development

### Tech Stack (MEHN)

- Mongodb
- Express
- Handlbars/Hbs
- NodeJS

### Requirements

**Software that are needed to be installed**

- Nodejs and Npm - [Latest](https://nodejs.org/en/download/current/)
- MongoDB Community Server - [Latest](https://www.mongodb.com/try/download/community)
- Basic knowledge of Ecmascript 6 (ES6), HTML and CSS - [Tutorial](https://github.com/KysonnDelaCerna/JavaScript-ES6-Tutorial)

### Setup

To start your project, select a directory that will house your application and create an empty folder (I'll use a webdev-project as my folder name; you can name this whatever you want). Open your terminal and locate the specific folder and enter the following command:

```
webdev-project> npm init -y
```

This command will add a `package.json` to the directory. This file is very important as it tracks all the dependencies you have on your project and the current version of those modules. The next step is to install the express module from the **npm** command so go back to the terminal and type:

```
webdev-project> npm install express
```

To verify that the module was installed, you should see a new folder called _node_modules_. This is where all the packages you installed through **npm** will go.

Once that is installed, create a file `app.js`, this will be our entry point for our application. The contents of the file should be:

```javascript
const express = require("express"); // import the express package

const app = express();

const PORT = 5000;

app.get("/", (_req, res) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
```

Once you create this file, you can now deploy your web application this with the command:

```
webdev-project> node app
```

The command should log out _Listening to port: 5000_. You can now access the site using your browser by typing _localhost:5000_ on the URL bar, which should show this:

![1.png](_assets/1.png)

Congratulations! You have your first web application.

---

### Nodemon

But we will encounter a problem when we want to change something on the `app.js` file but wouldn't immediately reflect to the server. Let's try editing this line:

```javascript
app.get("/", (_req, res) => {
  return res.send("Hello World");
});
// Change to
app.get("/", (_req, res) => {
  return res.send("Hi World");
});
```

Once you save the file then access the site, it will still give you the message "Hello World". To solve this, we need to restart the server by pressing **Ctrl + C** and rerunning the command of _node app_. There is no problem with doing this, but it becomes tedious when you have to edit and restart the server manually. To make our lives easier, there is a module that watches the files for us so once we edit and save, the server automatically restarts. That module is called **nodemon**. You can install the module by using the npm command:

```
webdev-project> npm i --save-dev nodemon
```

This module will be installed to our application, but as you can see there is difference when we installed the _express_ module with the additional tag **--save-dev** which just means that the module is just installed when you are in a development mode. This mode is only for the developers so that it would be easier to code the application, and at the same time, it is not needed when we deploy it to production (or to the public). Then we can edit the `package.json` file and edit the **scripts** key to have these values:

```json
...
"scripts": {
  "dev": "nodemon app"
},
...
```

So you can run the nodemon command through the `package.json` file by using the command:

```
webdev-project> npm run dev
```

And once we try and change something on `app.js` like changing the 'Hi World' into 'Test', then it should automatically restart the server for us.

---

### Folder Structure

The folder structure is very important in making our application; a very organized folder structure can help us locate the files we need to edit much easier. The folder structure I follow is as shown:

```
webdev-project(main folder)
+ - ctrl    # controller functions
+ - mw      # middleware functions
+ - routers # routing
+ - static  # static files (js/css/images)
+ - views   # templates
+ - app.js
+ - package.json
```

To understand each folders' functionality, let's adjust the app.get function located in the `app.js` file. We will need three files for this:

/ctrl/index.js

```javascript
const indexCtrl = {
  getIndex: (_req, res) => {
    return res.send("Hello World");
  },
};

module.exports = indexCtrl;
```

The controller should process the data and update the database and send a file or an html to the user. This should be the where we send our response to the client.

/mw/index.js

```javascript
const indexMw = {
  sample: (_res, _req, next) => {
    console.log("I'm a middleware");
    next();
  },
};

module.exports = indexMw;
```

The middlewares is mostly for validation, it should check whether the data given by the user is good and not break our database.

\*/routers/**\*index.js**

```javascript
const router = require("express")();
const mw = require("../mw/index");
const ctrl = require("../ctrl/index");

router.get("/", mw.sample, ctrl.getIndex);

module.exports = router;
```

The router is responsible for routing the paths of the application, and combines the middleware and controller functions that will be used.

/app.js

```javascript
const express = require("express");

const app = express();

const PORT = 5000;

const indexRtr = require("./routers/index");
app.use("/", indexRtr);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
```

So when we try to access _localhost:5000/_, it will give us a `Hello World` string. We haven't changed any logic or added another route yet, so let's try adding another URL path like _/sample_. To do that, we have to add to the _route_ and _ctrl_ files. The files should look like this:

/ctrl/index.js

```javascript
const indexCtrl = {
  getIndex: (_req, res) => {
    return res.send("Hello World");
  },
  getSample: (_req, res) => {
    return res.send("This is the sample path");
  },
};

module.exports = indexCtrl;
```

/routers/index.js

```javascript
...
router.get('/',
  mw.sample,
  ctrl.getIndex
);

router.get('/sample',
  ctrl.getSample
);

module.exports = router;
```

And there you go, we have created another path to our website. You can now access _localhost:5000/sample_ and see a different message.

---

### Router Folder

Our current router folder has only one file; but we can have multiple router files to point to different URL paths in our web application. Llet's try adding a new router file called `test` along with the additional files to the ctrl folder. Take note that you can name these files differently; I name the files similarly so that it is easy to trace later on.

/ctrl/test.js

```javascript
const testCtrl = {
  getIndex: (_req, res) => {
    return res.send("Test Route");
  },
};

module.exports = testCtrl;
```

/router/test.js

```javascript
const router = require("express")();
const ctrl = require("../ctrl/test");

router.get("/", ctrl.getIndex);

module.exports = router;
```

/app.js

```javascript
const express = require("express");

const app = express();

const PORT = 5000;

const indexRtr = require("./routers/index");
const testRtr = require("./routers/test");

app.use("/", indexRtr);
app.use("/test", testRtr);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
```

The first thing you will notice in the `app.js` file is the _app.get('/test', testRtr);_ and it's just an indicator that when you see '/test' in the URL, the router handling that will be handled by the `router/test.js` file.

When you look at the routing as well, '/test' isn't necessary to add in the path of the _.get()_ function in /router/test.js; this is because '/test' was appended at the start of the URL path when you linked it to the `app.js` file.

When you go to _localhost:5000/test_ then it should work and return the message. If we try adding another route in the `router/test.js` like a path to '/hello' it will be routed in the app to _localhost:5000/test/hello_ which is a very helpful tool when routes are tied to user access and privileges such as admin pages.

---

### Adding Handlebars

So we can send a string to our users but we want to give them an html file. There are a lot of ways to serve html files with express but in this tutorial we will use the handlebars templating engine which is simple enough to use. To start we need to add the module called **express-handlebars**.

```
webdev-project> npm install express-handlebars
```

and after the installation, we need to edit the `app.js` add them to these section of the code

app.js

```javascript
// REQUIRE
const exphbs = require('express-handlebars');

...

// INITIALIZE THE TEMPLATING ENGINE
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
...
```

This sets the **request** object to have a render method. We can now add `.hbs` files so that the server can render it. But first, we need to make a `views/layout/main.hbs` where this is the default layout used by handlebars which just contains the header and a template body.

views/layout/main.hbs

```handlebars
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }}</title>
</head>

<body>
  {{{ body }}}
</body>

</html>
```

This is your standard html format with the additional double/triple curly braces({{}}). The **{{ title }}** here is passed from the server which is in an object format(This will be shown later), and the **{{{ body }}}** will contain a template of your body, depending on what you want to render. To understand that, let's make an `views/index.hbs` file and try changing the **getIndex** function inside `ctrl/index.js`.

views/index.hbs

```handlebars
<h1>This is our homepage</h1>
```

ctrl/index.js

```javascript
getIndex: (_req, res) => {
  return res.render('index', {
    title: 'Index Page'
});
},
```

Let's look at the **res.render** function, which we can pass two params:

- **1st PARAM** is a **string** which is what we want as a template to in our **views** folder. To link that in our file structure, you can see that we have a `views/index.hbs`, this is what the res.render will get (note that the .hbs extension is not needed anymore). To further understand the implementation, let's say we have a `views/login.hbs` and to render that file, we just have to say **res.render('login')**.

This is what replaces the **{{{ body }}}** in the `views/layout/main.hbs` file. So that **{{{ body }}}** will be replaced with the contents of `views/index.hbs` so the body will look like this when passed to the client.

```html
<body>
  <!-- {{{ body }}} -->
  <h1>This is our homepage</h1>
</body>
```

**NOTE:** Triple brace also signifies that it needs to render the string as an html template, when you accidentally use a double brace, it will show in your browser as the literal string instead of the string is enclosed by _h1 tags_

---

When you use triple brace {{{}}}

<h1>This is our homepage</h1>

When you use double brace {{}}

```
<h1>This is our homepage</h1>
```

---

- **2nd PARAM** is an **object** which is the data that we want to pass to the template/html. So you can see we have a **title** in the object, this will be passed in the `views/layout/main.hbs` in the **{{ title }}** part, so whatever string is inside the **title** data it will just replace it in the html part.

So in the program, we passed a title data with the string Index Page, so when we render the page, the title tags will contain the string

```html
<title>Index Page</title>
```

We can also do this with the template itself so lets try doing it in the `views/index.hbs` and add some more embedding text.

views/index.hbs

```handlebars
<!-- Append to the end of the file -->
<h1>{{ header }}</h1>

{{ msg }}
```

and in the res.render should contain those keys

ctrl/index.js

```javascript
getIndex: (_req, res) => {
  return res.render('index', {
    title: 'Index Page',
    msg: 'Hi there guys',
    header: 'header'
  });
},
```

So it will the header and msg will replace the string.

**NOTE:** When you do not pass any data to render, hbs will just treat it as an empty string.

---

### Static Files (CSS and HTML)

Since we only put the skeleton(html) code to the user, we need to add some css(design) and javascript(functionality) so it would have a better user experience. We can try putting a **style** and **script** tag to our `index.hbs` file but it is not recommended since when we do that, the page will be rendered twice, (Once for the page load and one more when the styles are added), so styles should be always be linked inside **header** tag. We can solve this by passing it in the data section in our **res.render** method. So we need to edit the `views/layouts/main.hbs` and the **res.render** function

views/layouts/main.hbs

```handlebars
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>

    <!-- Default css -->
    <link rel="stylesheet" href="/static/css/main.css"> <!-- copy the main.css file -->
    <!-- Dynamic css -->
    {{#each styles}}
    <link rel="stylesheet" href="/static/css/{{ this }}.css">
    {{/each}}
</head>

<body>
    {{>navbar}}

    {{{ body }}}

    <!-- Dynamic JS -->
    {{#each scripts}}
    <link rel="stylesheet" href="/static/js/{{ this }}.js">
    {{/each}}
</body>

</html>
```

ctrl/index.js

```javascript
getIndex: (_req, res) => {
  return res.render('index', {
    title: 'Index Page',
    msg: 'Hi there guys',
    header: 'header',
    styles: [ 'register' ], // Copy static/css/register.css
    scripts: [ 'hello' ], // Copy static/js/hello.js
  });
},
```

This will add the links to the css and js but this will not work yet since we aren't serving the static files yet, so in the `app.js` we need to add this code.

app.js

```javascript
...
// MIDDLEWARES
app.use('/static', express.static(path.join(__dirname, 'static')));
...
```

This will route all of our css and js in the path. So example we have our main.css in the static/css folder. To access that in the site we just have to type the path **_http://localhost:5000/static/css/main.css_** which will print the contents of the css file. So once this is done you can reload the page see the design and scripts loaded for the page.

---

### Adding Partials

Partials are a way to modularize parts of code that we will be using multiple times across different pages. We can use partials to create a navbar so that once we make changes to the `views/partials/navbar.hbs` file, the changes would be reflected across all pages. Similar to how we used **{{{ body }}}** to render another .hbs file within `views/layout/main.hbs`, we can render the navbar partial using **{{> navbar}}**.

```handlebars
<body>
    {{>navbar}}

    {{{ body }}}
</body>
```

When we look at our navbar at `views/partials/navbar.hbs`, this is what we see. We can see that it just consists of a style and some links. We don't want every single link to be styled as active which is why we sandwich the `class="active"` in between the handlebars if clause `{{#if }} {{/if}}`. But what does the condition in the if statement mean?

```handlebars
<style>
    .active {
        background-color: green;
    }
</style>

<nav>
    <a href="/" {{#if ('===' tab 'index')}} class="active" {{/if}}>HOME</a>
    <a href="/login" {{#if ('===' tab 'login')}} class="active" {{/if}}>LOGIN</a>
    <a href="/register" {{#if ('===' tab 'register')}} class="active" {{/if}}>REGISTER</a>
</nav>
```

If we take a look at how we initialize the templating engine within our `app.js`, we can see a field called **helpers**. This allows us to create functions that we can call within our .hbs files. Here we can see that **'==='** is just checking for equality between **arg1** and **arg2**. But where did tab even come from?

```javascript
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        '===': (arg1, arg2) => arg1 === arg2,
    }
}));
```

If you recall, the **2nd PARAM** of **res.render** is an object that we can use to pass data to our template. If we take a look at `getIndex` of `ctrl/index.js`, we can see that we are passing the value of **'index'** as tab. This makes it so when we render the index, the **HOME** option will be the active link in our navbar. 

```javascript
getIndex: (_req, res) => {
  return res.render('index', {
    title: 'Index Page',
    msg: 'Hi there guys',
    header: 'header',
    tab: 'index'
  });
},
```

---

### dotenv

Dotenv is a module that allows us to declare variables containing sensitive information within an environment file (i.e. a .env file). For this project, we're using it to store our session's secret key. However, if you take a look around this project's file, you won't find a .env file. This is because we don't openly distribute them because of how sensitive they are. What is provided is the `.env.example` file. This contains all the variables that our program needs. We can copy this file and fill the in the values.

```
NODE_ENV=development

SESSION_SECRET=suchsecretmuchkey

MONGO_URI=mongodb://localhost:27017
MONGO_DB=webdev-project
```

**NOTE:** Windows won't allow you to rename the file to `.env` so you have to open up a command prompt and rename it there.

```
webdev-project> ren ".env - Copy.example" .env
```

Now that we have that setup we can then use the environment variables that we declared in our `app.js` by accessing them in `process.env`.

```javascript
require('dotenv').config();

const SESSION_OPT = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'development'
  }
};

app.use(session(SESSION_OPT));
```

**Using .gitignore**

So that we don't accidentally upload senstive files like our `.env` file or other unneccesary things, we can create a `.gitignore` file so that they will no longer be included.

```
*.DS_Store
.env
node_modules

feedback.txt
```

In this file, we declared that the .env and feedback.txt file, all files ending with .DS_Store, and the entire node_modules folder should not be uploaded into our git repository. This keeps our repository clutter free.

---

### Accessing the database

MongoDB stores data in the form of documents inside collections. In the case of our web application, we only need to store user data. We store all user data inside a collection appropriately called `users`. Each document within this collection pertains to one user. In this tutorial, we will show you two ways to access the MongoDB database. It's up to you to choose which one you prefer.

**Using MongoDB**

 The MongoDB package allows us to interact with our MongoDB database. We can use the connect function inside of `db/index.js` to connect to our MongoDB database.
 
```javascript
client: async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true
  });
  return client.db(process.env.MONGO_DB);
},
```

 Before we can do anything with our databse, we first have to connect to it. Once done you are free to perform any operations on the database. After we've connected, we can use `postRegister` of `ctrl/index.js` to interact with the users collection. This creates a new user inside our database with the corresponding fields.

```javascript
const db = await client();

await db.collection('users').insertOne({
  username,
  password: hash
});
```

We can see `postLogin` of `ctrl/index.js` access our database too. In this line, we can see that we are looking for only one specific user. Because username are supposed to be unique, we should only get one document with that username. The parameter that we are passing is an object with the fields that have those specific values. This is called a *query*. In this case, we're looking for the user with that specific username.

```javascript
const db = await client();

const user = await db.collection('users').findOne({ username });
```

You can check the documentation for these MongoDB functions and many more [here](https://docs.mongodb.com/manual/reference/method/js-collection/). If you want to further sort the documents that were found or perform other operations on it, you can check the documentation on those [here](https://docs.mongodb.com/manual/reference/method/js-cursor/).


**Using Mongoose**

Mongoose is another package that we can use to interact with out MongoDB database. It's different from the MongoDB package because we first have to define a **schema** for our collections. A schema is basically a way to describe how a document should look like. Over at `models/User.js`, we can see the schema for our user object. We can define the data type for each field and put specific constraints for them. For more information about data validation, you can check the documentation [here](https://mongoosejs.com/docs/validation.html).

```javascript
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    maxlength: 30,
    required: true,
    uniqure: true
  },
  password: {
    type: String,
    minlength: 60,
    maxlength: 60,
    required: true
  }
});

module.exports = mongoose.model('User', User);
```

Similar to the MongoDB package, we have to connect to the database first before we can do anything. However, we only need to connect inside our `app.js`. Mongoose will handle the rest for us.

```javascript
const mongoose      = require('mongoose');

// CONNECT TO DATABASE WITH MONGOOSE
mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
```

Now that we've done that, the rest is simple. We just have to import our User schema and do all our operations from there. In `ctrl/index.js`, we can see the Mongoose counterparts of the basic operations. Finding a single document is more or less the same with MongoDB.

```javascript
const User       = require('../models/User');

const user = await User.findOne({ username });
```

Inserting a document is different. It's called *create* instead of *insertOne*.

```javascript
await User.create({
  username,
  password: hash
});
```

For more information about the Mongoose model API you can go [here](https://mongoosejs.com/docs/api/model.html).

---

### Authentication (Login and Registration)

**Using express-session**

When we access websites like Facebook or YouTube, we can bypass the login page if we already logged in before. We can also implement this in our web application using express sessions. We can store important information about the sessions with the use of cookies that are encrypted using the session's secret key. We can tell express to use sessions using this snippet of code in our `app.js`.

```javascript
const session = require('express-session');

require('dotenv').config();

const SESSION_OPT = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'development'
  }
};

app.use(session(SESSION_OPT));
```

Now that we have configured sessions, we can now store informationg inside sessions. This is how logging in works inside `ctrl/index.js`. Whenever a use tries to log in, we retrieve that user from the database. If such user exists and their password matches, we then store that user in our session so that our web application can remember who they are. Although both the session and the user's password are encrypted, it is still a good practice to not include the user's password inside the session. This is done by deleting the password from the user object using `delete user.password`.

```javascript
postLogin: async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await client();

    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(403).render('login', {
        title: 'Login Page',
        tab: 'login',
        error: 'Auth Failed'
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(403).render('login', {
        title: 'Login Page',
        tab: 'login',
        error: 'Auth Failed'
      });
    }

    delete user.password;

    req.session.user = user;

    return res.redirect('/user');

  } catch (err) {
    console.log(err);

    return res.status(500).render('login', {
      title: 'Login Page',
      tab: 'login',
      error: 'Something went wrong on our side'
    });
  }
},
```

This makes it so that we can login and the web application will remember who we are. However, when we visit the login page, it doesn't automatically redirect us the user page. Even worse, we can access the user pages without actually being logged in if we manually type in the URL. To fix this, we need to create a middleware that will check if a user is authenticated or not and redirect them accordingly. In `mw/auth.js` we export two seperate functions to deal with the two problems. `isAuth` will allow the user to access portions of the site only if they're authenticated. On the other hand, `isNotAuth` will automatically redirect an authenticated user to the user page when they try to login.

```javascript
const authMw = {
  isAuth: (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    next();
  },

  isNotAuth: (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/user');
    }

    next();
  }
};
```

We may have created a way to check if the user is authenticated, but we still haven't told our web application to actually check. We can do this by inserting the middleware in our router. In `routers/index.js`, we can see the `isNotAuth` function being used before we can access the login page. This makes it so that an authenticated user would instantly skip the login page.

```javascript
router.get('/login',
  authMw.isNotAuth,
  ctrl.getLogin,
);
```

We can see `isAuth` being used inside `routers/user.js`. This makes sure that a user is logged in before they can access the user page.

```javascript
router.get('/',
  authMw.isAuth,
  ctrl.getUser
);
```

---

### bcrypt

When storing user passwords or password hints inside a database, we should **NEVER** store them as plaintext. This makes data breaches very dangerous because all user accounts will be instantly compromised. We can use bcrypt to hash user passwords before storing them inside our database. Additionally, we can include the use of salt to make our hashes even more unpredictable. We can see this in action inside `postRegister` of `ctrl/index.js`.

```javascript
const salt = await bcrypt.genSalt(8);
const hash = await bcrypt.hash(password, salt);

await db.collection('users').insertOne({
  username,
  password: hash
});
```

When logging in, we can check if a user's password matches the one in the database using `bcrpty.compare()`. This function takes two parameters. The first parameter is the password we're testing. The second parameter is the password we're testing against. We can see this being used in `postLogin` of `ctrl/index.js`.

```javascript
const valid = await bcrypt.compare(password, user.password);
```