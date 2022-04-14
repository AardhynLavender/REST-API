# Node REST API - Aardhyn Lavender 2022

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

### Deployment ( Heroku )

#### If you store a remote branch of your repository on **GitHub**, the steps are quite simple:

- Create a new application in Heroku.
- Select the **Connect to GitHub** deployment method under **Deploy**, ( private GitHub repositories will require authentication )
- Enable automatic deploys, and your production build is good to go!

This method makes use of **GitHub WebHooks** to automatically deploy your application when you push to the specified remote branch

#### If you wish to deploy without **GitHub** or just want to control your deployments manually, we can use the **Heroku CLI**:

Follow the steps [here](https://devcenter.heroku.com/articles/heroku-command-line) to install the **Heroku CLI**

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key

```shell
cd < project root >
heroku login
heroku git:remote -a < app name >
```

Push your local `main` to the `heroku` remote branch -- this is your `deployment`

```shell
git push heroku main
```

For both **GitHub** and **Heroku CLI** methods you will need to configure the production environment

Use the information in the aforementioned `template.env` to create _config vars_ in Heroku for these in the `settings pane`
