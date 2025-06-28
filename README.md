<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
Given my use case:



## Project setup

```bash
$ npm install
```

## Database setup
### MySQL
Migrate the database schema using Prisma:
```bash
$ npm run prisma:m
```
Seed the database with initial data:
```bash
$ npm run seed:sql
```
### MongoDB
Migrate the database schema
```bash
$ npm run mongo:up
```
Seed the database with initial data:
```bash
$ npm run seed:nosql
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## API Swagger Documentation
To create a NestJS application that serves as a RESTful API for managing a collection of books, including features for adding, retrieving, updating, and deleting books: http://localhost:3000/api


# Relational ERD
<img src="./docs/prisma-erd.svg">

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
