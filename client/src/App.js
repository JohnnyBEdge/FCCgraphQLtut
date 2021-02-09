import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


//apollo client setup
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`
});

function App() {
  return (
    //passes data from client endpoint and shares with application
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
