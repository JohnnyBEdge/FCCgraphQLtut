//this file will define the schema
//schema will describes data and relations

const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

//destructing: taking this variable out of package
const { 
    GraphQLObjectType, GraphQLString, GraphQLSchema, 
    GraphQLID, GraphQLInt, GraphQLList
} = graphql;

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
               return Author.findById(parent.authorId)
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
                return Book.find({authorId: parent.id})
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
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                //this is our author model
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                //mongoose save method
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLString}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    authorId: args.authorId,
                    genre: args.genre
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});