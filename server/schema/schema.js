//this file will define the schema
//schema will describes data and relations

const graphql = require('graphql');
const _ = require('lodash');

//destructing: taking this variable out of package
const { 
    GraphQLObjectType, GraphQLString, GraphQLSchema, 
    GraphQLID, GraphQLInt, GraphQLList
} = graphql;

//dummy data
const books = [
    {name: 'book1', genre: 'sci-fi', id: '1', authorId: '1'},
    {name: 'book2', genre: 'sci-fi', id: '2', authorId: '2'},
    {name: 'book3', genre: 'fantasy', id: '3', authorId: '3'},
    {name: 'book4', genre: 'sci-fi', id: '4', authorId: '1'},
    {name: 'book5', genre: 'sci-fi', id: '5', authorId: '2'},
    {name: 'book6', genre: 'fantasy', id: '6', authorId: '3'},
];
const authors = [
    {name: 'author1', age: 44, id: '1'},
    {name: 'author2', age: 43, id: '2'},
    {name: 'author3', age: 41, id: '3'},
];

//defining our first type
const BookType = new GraphQLObjectType({
    name: 'Book',
    //we wrap the field in a function bc it keep the code from executing before all the code has run.
    //if removed you would get an error saying authortype is undeclared
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            //if user request the author, graphql uses resolve to return author belonging to book
            resolve(parent, args){
                //parent is the data of the intial query
                //use it to search authors matching on the authorID
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            //going to create a list of book types
            //filtered on authID = parentID
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log("PARENT", parent)

                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

//how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            //these are the arguments that should be passed when querying a book
            args:{id: {type:GraphQLID}},
            resolve(parent, args){
                //code to get data from DB/ other source
                return _.find(books,{id:args.id});
            }
        },
        author: {
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});