const express = require('express');
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const {Todos} = require("./constants/Todo");
const {Users} = require("./constants/Users");


const startServer = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                phone: String!
                email: String!
            }

            type Todo {
                id: ID!
                title: String!
                completed: Boolean!
                userId: ID!
                user: User
            }

            type Query {
                getTodos: [Todo]
                getUsers: [User]
            }
        `,
        resolvers: {
            Todo: {
                // user: async (todo) => {
                //     console.log("here")
                //     const data = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
                //     console.log(data);
                //     return data?.data
                // }
                user: (todo) => Users.find(user => user.id === todo.userId)
            },
            Query: {
                // getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                // getUsers: async() => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getTodos: () =>  Todos,
                getUsers: () => Users
            }
        }
    })

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server))

    app.listen(8000, () => {
        console.log("server running on port 3000")
    })


    

}

startServer();