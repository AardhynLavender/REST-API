# Node REST API - Aardhyn Lavender 2022
 
## Application Description
 
The application will provide the functionality to create, read, update, and delete information in a recipe repository.

For now, I can think of 5 Collections that include at least 7 relationships

`users` `ingredients` `utensils` `components` `recipes`

These collections in conjunction with the API will allow users to:

- create `users` that will manipulate and query data. ( They will 'author' `components` and `recipes`, and 'own' `ingredients` and `utensils` )
- define `components` that group `ingredients` and `utensils` together -- i.e. *Fry Egg*, *bread fish*.
- combine `components` to create `recipes`
- request all `recipes` that use **x, y, z** ingredients
- query all `ingredients` for a given `recipe`
- request all `recipes` that take less than **n** to create
- [ as the project evolves, perhaps more... ]

I aim to use this API as the backend for my React CRUD
 
## Postman API Documentation

```url
http://somewhereOnPostman
```
 
## Live Application

Start all requests with
```url
http://undeterminedappname/v1/
```

## Installation
 
Run in the directory you keep your git repositories

*requires:* `node` `npm`

```bash
git clone https://github.com/otago-polytechnic-bit-courses/intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
cd intro-app-dev-2022-project-1-node-js-rest-api-AardhynLavender
npm install
```

### Local Deployment

```bash
npm start
```

### Remote Deployment ( Heroku )

```bash
```

## Project Structure

```
./
+--loremipsum.cpp
```

---
