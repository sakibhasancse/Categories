# E-commerce categories
Multi level nested category using graphql

## Contents

- [Project installation](#project_installation)
- [Running the application](#running-the-application)
- [Languages & tools](#tools)

## Project installation

- To install the project first you need to clone the project, then open your terminal and run the following command

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

- After completing this process the server will be ready for testing, you will see the following logs

```sh
🚀 Server ready at http://localhost:4000
MongoDB Connected: localhost
```

- Open your browser and visit this http://localhost:4000 url

## Languages & tools

- [Node](https://nodejs.org/en/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [GraphQL Apollo Server v4](https://www.apollographql.com/docs/apollo-server)
- [Redis](https://redis.js.org/)


Apollo playground 

![Screenshot 2023-03-14 at 5 00 30 AM](https://user-images.githubusercontent.com/57236854/224851265-ebccc429-d371-4fa9-9adc-97459139d7fc.png)
