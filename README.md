# Node REST API - Aardhyn Lavender 2022

## Application Description

The application will provide the functionality to create, read, update, and delete information in a recipe repository.

For now, I can think of 5 Collections that include potentially 7 relationships.

`users` `ingredients` `utensils` `components` `recipes`

### Use Cases

These collections in conjunction with the API will allow users to:

- create `users` that will manipulate and query data. ( They will 'author' `components` and `recipes`, and 'own' `ingredients` and `utensils` )
- define `components` that group `ingredients` and `utensils` together -- i.e. _Fry Egg_, _bread fish_.
- combine `components` to create `recipes`
- request all `recipes` that use **x, y, z** ingredients
- query all `ingredients` for a given `recipe`
- request all `recipes` that take less than **n** to create
- [ as the project evolves, perhaps more... ]

I aim to use this API as the backend for my React CRUD

## Postman API Documentation

> _documentation currently unavailable_

```url
http://somewhereOnPostman
```

## Live Application

Before requesting, login first

### Login

> _this endpoint has not yet been implimented_

| Username    | Password                           |
| :---------- | :--------------------------------- |
| ~~_guest_~~ | ~~_correct-horse-battery-staple_~~ |

```url
https://recipe-repository-api.herokuapp.com/v1/login
```

This will authenticate the application's routes for `1 hour`, clearing cache notwithstanding

### Base Endpoint

```url
https://recipe-repository-api.herokuapp.com/v1/
```

see the ~~[API documentation]()~~ for the available functions

## Cloning and Installation

excecute in the directory you keep your git repositories

_requires:_ `node` `npm`

```bash
git clone https://github.com/otago-polytechnic-bit-courses/intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
cd intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
npm install
```

### Local Deployment

#### basic run

```bash
npm start
```

#### development -- nodemon and prettier

```bash
npm run local
```

just use `npm run format` to format without running. alternatively, configure prettier to `format on save`

No test scripts have been configured, `npm run test` does nothing.

### Deployment Configuration ( Heroku )

```bash

```

---
