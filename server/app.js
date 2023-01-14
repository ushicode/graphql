const express = require('express');
//This express-graphql module  allows express to understand GraphQL & provides a simple way to create an express server that runs the graphQL api
const { graphqlHTTP } = require('express-graphql'); 
const schema = require('./schema/schema')
const db = require("./db/db.connect")
const app = express()

db.connect(); //Connecting db

app.use('/graphql', graphqlHTTP({ 
    schema,
    graphiql: true
}),
);


app.listen(6200, ()=>{
    console.log('GraphQL Dev Server:  running on PORT: 6200');
})

