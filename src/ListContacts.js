import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListContact extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
        onNavigate: PropTypes.func.isRequired
    }

    state = {
        query: ''            
    }

    updateQuery = (query) => {
        this.setState(()=> ({
            query: query
        }));
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    render () {
        const { query} = this.state;

        const { contacts, onDeleteContact } = this.props;

        const showContacts = (query.length === 0)
            ? contacts
            : contacts.filter((contact)=> ( contact.name.toLowerCase().includes(query.toLowerCase()) ))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value= { this.state.query }
                        onChange = { (event) => { this.updateQuery(event.target.value)}}
                    />
                    <Link
                        to='/create'
                        className='add-contact'
                    >
                        Add Contact
                    </Link>
                </div>
                {showContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showContacts.length} of {contacts.length} </span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showContacts.map((person)=>(
                        <li key={person.id} className='contact-list-item'>
                            <div 
                                className='contact-avatar'
                                style={{
                                    backgroundImage: `url(${person.avatarURL})`
                                }}
                            >
                            </div>
                            <div className='contact-details'>
                                <p>{person.name}</p>
                                <p>{person.handle}</p>
                            </div>
                            <button onClick={() => onDeleteContact(person)} className="contact-remove">
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContact