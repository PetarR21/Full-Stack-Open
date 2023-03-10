import { useEffect, useState } from 'react';

import personService from './services/person';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const addPerson = async (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const person = persons.find((person) => person.name == newName);
        const newPersonObject = { ...person, number: newNumber };
        const updatedPerson = await personService.update(person.id, newPersonObject);
        setPersons(
          persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person))
        );
        showNotification(
          `Updated ${updatedPerson.name} number to ${updatedPerson.number}`,
          'success'
        );
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      const savedPerson = await personService.create(personObject);

      setPersons(persons.concat(savedPerson));
      showNotification(`Added ${savedPerson.name}`, 'success');
    }

    setNewName('');
    setNewNumber('');
  };

  const removePerson = async (id) => {
    const person = persons.find((person) => +person.id === +id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      try {
        await personService.remove(id);
        setPersons(persons.filter((person) => +person.id !== +id));
        showNotification(`Removed ${person.name}`, 'success');
      } catch (error) {
        setPersons(persons.filter((person) => +person.id !== +id));
        showNotification(
          `Information of ${person.name} has already been removed from the server`,
          'error'
        );
      }
    }
  };

  const personsToShow = persons.filter(
    (person) =>
      person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
      person.number.trim().toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} remove={removePerson} />
    </div>
  );
};

export default App;
