const express = require('express');
//allows express to understand graphql 
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

//middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Now listening for requests on port 4000.");
});


