const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql; //Extract GraphQLObjectType, GraphQLString and more by destructuring graphql
const _= require('lodash')

// dummy data
const books = [
    {name: 'Name of the wind', genre: 'Fantasy', id:'1'},
    {name: 'The Final Empire', genre: 'Fantasy', id:'2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id:'3'}
];

// graphql book schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // NB: not wrapped in call back because order isn't necessary for root query
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        console.log(args.id);
        return _.find(books, {id:args.id});
      },
    },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})