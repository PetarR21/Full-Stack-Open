/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PERSON } from '../queries';

const Person = ({ person, onClose }) => {
  console.log(person);
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.city} {person.address.street}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => {
          setNameToSearch(null);
        }}
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      <div>
        {persons.map((person) => (
          <div key={person.name}>
            {person.name} {person.phone}
            <button
              onClick={() => {
                setNameToSearch(person.name);
              }}
            >
              show address
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
