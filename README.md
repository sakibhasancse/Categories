# C-commerce categories

## Contents

- [Project install](#project_install)
- [Running the application](#running-the-application)
- [Languages & tools](#tools)

## Project install

- To install the project first you need to clone the project, open your terminal and run the following command

```sh
> git clone https://github.com/sakibhasancse/Categories.git
> cd ecommerce
```

## Running the application

#### Prerequisites

- [Node](https://nodejs.org/en/)
- [Mongodb](https://www.mongodb.com/)
- [Redis](https://redis.js.org/)

##### Steps

#### Server commands

- Create a `.env` file and Add the below entries or change accordingly. You can follow the `.env.sample` file to see the format.

  ```
  MONGO_URL=mongodb://localhost:27017/categorydb
  PORT=4000
  REDIS_HOST=127.0.0.1
  REDIS_PORT=6379
  ```

- Open your terminal and run the following command

```sh
cd Categories
npm install
npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [GraphQL Apollo Server v4](https://www.apollographql.com/docs/apollo-server)
- [Redis](https://redis.js.org/)