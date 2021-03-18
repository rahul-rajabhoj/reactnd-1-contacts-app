import React, { Component } from 'react';
import ListContact from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router';

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
        <Route exact path='/' render={() => (
            <ListContact 
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
        )} />
        <Route path='/create' render={() => (
          <CreateContact /> 
        )} />
      </div>
    );
  }
}

export default App;
