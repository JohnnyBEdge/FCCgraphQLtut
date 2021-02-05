const express = require('express');
//allows express to understand graphql 
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

require('dotenv').config()
const app = express();


//database connection
const pw = process.env.DB_PW
const user = process.env.DB_USER

mongoose.connect(`mongodb+srv://${user}:${pw}@johndev-og4z7.mongodb.net/fcc_graphql_tut?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },)
mongoose.connection.once('open', () => {
    console.log("CONNNECTED TO DATABASE")
})

//middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Now listening for requests on port 4000.");
});


