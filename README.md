# Node REST API - Aardhyn Lavender 2022

## Application Description

The application will provide the functionality to create, read, update, and delete information in a recipe repository.

### Use Cases

- create `users` that will manipulate and query data. ( They will 'author' `components` and `recipes`.
- define `components` that group `ingredients` and `utensils` together -- i.e. _Fry Egg_, _bread fish_.
- combine `components` to define `recipes`

I aim to use this API as the backend for my React CRUD

## Postman Documentation

```url

```

## Live Application

Before requesting, Register a user using the `/register` endpoint -- explained in the Postman Documentation

### Login

Login with a `username`|`email` and your `password` -- documented in Postman

```url
https://recipe-repository-api.herokuapp.com/login
```

Successfully logging in will authenticate the application's routes for a specified amount -- clearing cache notwithstanding.

### Base Endpoint

```url
https://recipe-repository-api.herokuapp.com/v1/
```

see the ~~[API documentation]()~~ for the available functions

## Cloning and Installation

execute in the directory you keep your git repositories

_requires:_ `node > 4.0` and `npm > 6.0`

```bash
git clone https://github.com/otago-polytechnic-bit-courses/intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
cd intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
npm install
vim app.ts
```

### Local Deployment

#### Configure Environment

set environment variables in `template.env`

remember to rename--`git` will ignore nameless `.env` files.

```bash
mv template.env .env
vim .env
```

---

**MONGO_URI**

create a `MongoDB` atlas cluster, and retrieve the `connection string` for a Node.js application.

set `mongo_URI` to your connection string replacing`<password>` with the password for your created admin user.

If you have multiple databases, you might need to check the `database name` is correct.

Do not create any collections! The API's defined models will create the collections for us if they don't exist.

---

**JWT_SECRET**

You can choose what this is, preferably the longer the better, like--_but don't use_--this one:

```.env
JWT_SECRET=correct-horse-battery-staple
```

---

**JWT_LIFETIME**

How long should a user be logged in before authentication is required again? I prefer `1h`.

specify an integer and a unit, _1h, 2h, 30m, 10s_

```.env
JWT_LIFETIME=<integer><unit>
```

---

#### Standard Run

```bash
npm start
```

#### Development Run -- Nodemon

Restarts the node process based on changes

```bash
npm run local
```

just use `npm run format` to format without running. alternatively, configure prettier to `format on save`

No test scripts have been configured, `npm run test` does nothing.

### Deployment Configuration ( Heroku )

```bash

```

---
