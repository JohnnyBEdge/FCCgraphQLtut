import React from 'react';
import {gql} from 'apollo-boost';
//binds apollo to react
import {graphql} from 'react-apollo';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`


const AddBook = (props) => {

    const displayAuthors = () => {
        let data = props.data;

        if(data.loading){
            console.log("LOADING")
            return (<option disabled>Loading Authors...</option>)
        } else {
            console.log("LOADED", data)
            return ( data.authors.map(author => {
                    return <option key={author.id} value={author.id}>{author.name}</option>
                })
            )
        }
    }

    return (
        <form id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select authors</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default graphql(getAuthorsQuery)(AddBook);
