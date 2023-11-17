import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  setFilter,
} from 'redux/contacts/contacts.reducer';

const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.contactsStore.filter);

  const deleteContactById = id => {
    dispatch(deleteContact(id));
  };

  const onContactFormSubmit = ({ name, number }) => {
    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExists) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact(name, number));
  };

  const onFilterChange = value => {
    dispatch(setFilter(value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={contact => onContactFormSubmit(contact)} />

        <h2>Contacts</h2>
        <Filter onFilterChange={value => onFilterChange(value)} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContactById}
        />
      </div>
    </>
  );
};

export default App;
