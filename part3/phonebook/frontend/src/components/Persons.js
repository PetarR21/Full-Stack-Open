import Person from './Person';

const Persons = ({ persons, remove }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          remove={() => {
            remove(person.id);
          }}
        />
      ))}
    </div>
  );
};

export default Persons;
