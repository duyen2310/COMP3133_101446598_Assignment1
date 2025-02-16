const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolver');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();

connectDB();

// //apollo server with authentication
// const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });

// async function startServer() {
//     await server.start();
//     server.applyMiddleware({ app });
// }

// startServer();

module.exports = app;
