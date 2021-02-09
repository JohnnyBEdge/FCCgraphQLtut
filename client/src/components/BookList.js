import React from 'react';
import {gql} from 'apollo-boost';
//binds apollo to react
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`;

const BookList = (props) => {
    
    const displayBooks = () => {
        let data = props.data;
        if(data.loading){
            return (<div>Loading...</div>);
        } else {
            return (
                data.books.map(book => {
                    return <li>{book.name}</li>
                })
            )
        }
    }


    

    return (
        <div >
            <ul id="book-list">
                {displayBooks()}

            </ul>
            
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);
