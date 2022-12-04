const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphql; //Extract GraphQLObjectType, GraphQLString and more by destructuring graphql
const _= require('lodash')

// dummy data
const books = [
    {name: 'Name of the wind', genre: 'Fantasy', id:'1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id:'2',  authorId: '3'},
    {name: 'Purple Hibiscus', genre: 'Epic', id:'3',  authorId: '2'},
    {name: 'The lion loin', genre: 'Epic', id:'4',  authorId: '2'},
    {name: 'Squeeze box', genre: 'Local', id:'5',  authorId: '2'}
];

const authors = [
    {name:'Patrick Ries', age:44, id:'1'},
    {name:'Chimamanda Adichie', age:42, id:'2'},
    {name:'Terry Pratchett', age:67, id:'3'}
];

// graphql book schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type: AuthorType,
            resolve(parent, args){
                console.log("Bk-Pr: ", parent);
                return _.find(authors, {id:parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id })
            }
        }
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
        return _.find(books, {id:args.id});
      },
    },
    author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          // code to get data from db/other source
          return _.find(authors, {id:args.id});
        },
      }

  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})