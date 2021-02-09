import React from 'react';
//binds apollo to react
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';


const BookDetails = (selected) => {
    console.log("SELECTED", selected)

    return (
        <div id="book-details">
            <p>Book details here</p>
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (selected) => {
        return {
            variables: {
                id: selected
            }
        }
    }
})(BookDetails);
