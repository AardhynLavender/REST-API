# Node REST API - Aardhyn Lavender 2022

My second year BIT assignment REST API submission, awarding a grade of 99.25%

## Application Description

The application will provide the functionality to create, read, update, and delete information in a recipe repository

### Use Cases

- create `users` that will manipulate and query data. ( They will 'author' `components` and `recipes`, and 'own' `ingredients` and `utensils`
- define `components` that group `ingredients` and `utensils` together -- i.e. _Fry Egg_, _bread fish_
- combine `components` to define `recipes`

I aim to use this API as the backend for my React CRUD

## API Documentation

View the complete [API Documentation](https://documenter.getpostman.com/view/18456662/Uyr4HzQf) on `Postman`

## Live Application

Before requesting, Register a user using the `/register` endpoint -- explained in the Postman Documentation

### Login

Login with a `username`|`email` and your `password` -- documented in Postman

```url
https://id1000096681-laveat1.herokuapp.com/login
```

Successfully logging in will authenticate the application's routes for an amount specified in your environment variables -- clearing cache notwithstanding

### Base Endpoint

```url
https://id1000096681-laveat1.herokuapp.com/api/v1/
```

See the [API documentation](https://documenter.getpostman.com/view/18456662/Uyr4HzQf) for the available functions

## Cloning and Installation

Execute in the directory you keep your git repositories

_requires:_ `node > 4.0` and `npm > 6.0`

```shell
git clone https://github.com/otago-polytechnic-bit-courses/intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
cd intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
npm install
vim app.ts
```

### Local Deployment

#### Configure Environment

Set environment variables in `template.env`

Remember to rename the file first--`git` will ignore `.env` files

```shell
mv template.env .env
vim .env
```

---

**MONGO_URI**

Create a `MongoDB Atlas` cluster, and retrieve the `connection string` for a Node.js application

Set `mongo_URI` to your connection string replacing `<password>` with the password for your created admin user

If you have multiple databases, you might need to check the `database name` is correct

Do not create any collections! The API's defined models will create the collections for us if they don't exist

---

**JWT_SECRET**

You can choose what this is, preferably the longer the better, like--_but don't use_--this one:

```.env
JWT_SECRET=correct-horse-battery-staple
```

---

**JWT_LIFETIME**

How long should a user be logged in before authentication is required again? I prefer `1h`

Specify an integer and a unit, _1h, 2h, 30m, 10s_

```.env
JWT_LIFETIME=<integer><unit>
```

---

#### Standard Run

```shell
npm start
```

#### Development Run -- Nodemon and Prettier

Restarts the node process based on changes

```shell
npm run local
```

Use `npm run format` to format without running. Alternatively, configure prettier to `format on save`

No test scripts have been configured, `npm run test` does nothing

## Deployment ( Heroku )

There are a couple of options to consider when deploying to Heroku. Automatically with **GitHub**, or manually with the **Heroku CLI**

### GitHub

- Create a new application in Heroku.
- Select the **Connect to GitHub** deployment method under **Deploy**, ( private GitHub repositories will require authentication )
- Enable automatic deploys and select your deployment branch
- _Your production build is good to go!_

This method makes use of **GitHub WebHooks** to automatically deploy your application when you push to the specified remote branch

### Heroku CLI

Follow the steps [here](https://devcenter.heroku.com/articles/heroku-command-line) to install the **Heroku CLI**

Log in to your Heroku account from the CLI

_from project root_

```shell
heroku login
heroku git:remote -a < app name >
```

Push your local `main` ( or another branch ) to the `heroku` remote branch with

```shell
git push heroku main
```

that's it! I'd recommend setting up a deployment `npm script` to make this easier.
