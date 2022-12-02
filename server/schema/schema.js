const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql; //Extract GraphQLObjectType, GraphQLString and more by destructuring graphql

// graphql book schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLString},
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})