import React, { Component } from 'react';
import ListContact from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(()=> ({
          contacts
        }))
      })
  }

  removeContact = (contact) => {
    this.setState( (currentState) => ({
        contacts: currentState.contacts.filter(c => c.id !== contact.id)
    }));
  
    ContactsAPI.remove(contact);
  }

  render() {
    console.log('Render called', this.state);
    return (
      <div>
        <ListContact 
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts} 
        />
      </div>
    );
  }
}

export default App;
