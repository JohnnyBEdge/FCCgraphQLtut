import React, {useState} from 'react';
//binds apollo to react
import {graphql} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';
//compose was removed from react-apollo, use this instead
import * as compose from 'lodash.flowright';


const AddBook = (props) => {
    const[name, setName] = useState('');
    const[genre, setGenre] = useState('');
    const[author, setAuthor] = useState('');

    const displayAuthors = () => {
        let data = props.getAuthorsQuery;
        if(data.loading){
            return (<option disabled>Loading Authors...</option>);
        } else {
            return ( data.authors.map(author => {
                    return <option key={author.id} value={author.id}>{author.name}</option>
                })
            );
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: author
                },
            refetchQueries: [{query: getBooksQuery}]
            }
            
            )
    }

    return (
        <form id="add-book" onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthor(e.target.value)}>
                    <option>Select authors</option>
                    {displayAuthors()}
                </select >
            </div>
            <button>+</button>
        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery,{name: "getAuthorsQuery"}),
    graphql(addBookMutation,{name: "addBookMutation"})
)(AddBook);
