import './ContactList.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selector';
import { Contact } from 'components/Contact/Contact';
import { useGetContactsQuery } from 'redux/contactsSlice';

const ContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  const { filter } = useSelector(getFilter);

  if (!data) {
    return null;
  }
  const visibleContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {!error && isLoading && <div>Loading</div>}
      <ul className="List_box">
        {visibleContacts.map(contact => (
          <li className="List_item" key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.object,
  input: PropTypes.string,
};