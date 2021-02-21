# WEB DEV with node-express-hbs-mongodb

#### Requirements

**Software that are needed to be installed**

- Nodejs and Npm
- MongoDB Server

- Basic knowledge of Ecmascript 6 (ES6), HTML and CSS

#### Setup

To start your project, select a directory where to place your application and create an empty folder(I'll use a webdev-project as my folder name, you can name this whatever you want). Open your terminal and locate the specific folder and enter the following command:

```
webdev-project> npm init -y
```

This command will add a `package.json` to the directory. This file is very important so that you can track all the dependencies you have on your project and track the current version of those modules. The next step is to install the express module from the **npm** command so go back to the terminal and type:

```
webdev-project> npm install express
```

To verify that the module was installed you should see a new folder called *node_modules*. This is where all the packages you installed through **npm**.

Once that is installed, create a file `app.js`, this will be our entry point for our application. The contents of the file should be:

```javascript
const express = require('express'); // import the express package

const app = express();

const PORT = 5000;

app.get('/', (_req, res) => {
  return res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
```

Once you create this file, you can now deploy this with the command:

```
webdev-project> node app
```

The command should log out *Listening to port: 5000* and you can access the site using yout browser and type *localhost:5000* and it should show this

![1.png](_assets/1.png)

Congratulations! You have your first web application.

---
#### Nodemon

But we will encounter a problem when we want to change something on the `app.js` file so lets try editting it on this line:

```javascript
app.get('/', (_req, res) => {
  return res.send('Hello World');
});
// Change to
app.get('/', (_req, res) => {
  return res.send('Hi World');
});
```

Once you save this and access the site, it will still give you the message "Hello World". To solve this, we need to restart the server by pressing **Ctrl + C** and rerunning the command of *node app*. There is no problem with doing this, but it becomes tedious when you have to edit and restart the server manually. So in order to make our lives easier, there is a module that watches the files for us so once we save, the server automatically restarts. So that module is called **nodemon**. To install the module is to npm it:

```
webdev-project> npm i --save-dev nodemon
```

This module will be installed to our application but as you can see there is difference when we installed the *express* module with the additional tag **--save-dev** which just means that the module is just installed when you are in a development mode. This mode is only for the developers so that it would be easier to code the application, and at the same time, it is not needed when we deploy it to production(or to the public). Then we can edit the `package.json` file and edit the **scripts** key to have these values:

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
#### Folder Structure

The folder structure is very important making application so that you have a very organized folder structure and you can locate the files you need to edit much easier. The folder structure I follow is as follows:

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

To understand each folders functionality, let's adjust the app.get located in the `app.js` file. We should need three files for this:

/ctrl/index.js
```javascript
const indexCtrl = {
  getIndex: (_req, res) => {
    return res.send('Hello World');
  }
};

module.exports = indexCtrl;
```

The controller should process the data and update the database and send a file or an html to the user. This should be the where we send our response to the client.

/mw/index.js
```javascript
const indexMw = {
  sample: (_res, _req, next) => {
    console.log('I\'m a middleware');
    next();
  }
};

module.exports = indexMw;
```

The middlewares is mostly for validation, it should check whether the data given by the user is good and not break our database.

/routers/index.js
```javascript
const router  = require('express')();
const mw      = require('../mw/index');
const ctrl    = require('../ctrl/index');

router.get('/',
  mw.sample,
  ctrl.getIndex
);

module.exports = router;
```

The router is responsible for routing the paths of the application, and combines the middleware and controller functions that will be used.

/app.js
```javascript
const express = require('express');

const app = express();

const PORT = 5000;

const indexRtr = require('./routers/index');
app.get('/', indexRtr);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
```

So when we try accessing the *localhost:5000/* it will give us a Hello World string. We haven't change any logic or added another route but let's try adding another route like */sample* so in order to do that you have to add to the route and ctrl files at most so the files should look like

/ctrl/index.js
```javascript
const indexCtrl = {
  getIndex: (_req, res) => {
    return res.send('Hello World');
  },
  getSample: (_req, res) => {
    return res.send('This is the sample path');
  }
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

And there you go, you created another path to your website, you can now access *localhost:5000/sample* and see a different message.

---
#### Router Folder

The current router folder we have has only 1 file, but you can have multiple router files but what's the different with all those router files, so let's try adding a new router file called test with the additional files to the test ctrl

/ctrl/test.js
```javascript
const testCtrl = {
  getIndex: (_req, res) => {
    return res.send('Test Route');
  },
};

module.exports = testCtrl;
```

/router/test.js
```javascript
const router  = require('express')();
const ctrl    = require('../ctrl/test');

router.get('/',
  ctrl.getIndex
);

module.exports = router;
```

/app.js
```javascript
const express = require('express');

const app = express();

const PORT = 5000;

const indexRtr = require('./routers/index');
const testRtr = require('./routers/test');
app.get('/', indexRtr);
app.get('/test', testRtr);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
```

The first thing that is different is that you see in the `app.js` file is the *app.get('/test', testRtr);* and it's just an indicator that when you see '/test' it is certain that the router handling that is the `router/test.js`. When you look at the routing as well '/test' isn't necessary to add in the test.js because '/test' was appended at the start when you added in the `app.js` file. When you go to *localhost:5000/test* then it should work and return the message. If we try adding another route in the `router/test.js` like a path to '/hello' it will be routed in the app to *localhost:5000/test/hello* which is a very helpful tool when routing is tied to user access and priveleges.

---
#### Adding handlebars

So we can send a string to our users but we want to give them an html file with design and logic. There are a lot of ways to server html files with express but in this tutorial we will use the handlebars templating engine which is simple enough to use. To start we need to  
