import React from "react";

const Person = ({ person, deleteName }) => {
  return (
    <div>
      <p>
        {person.name} {person.number} <button onClick={() => deleteName(person.id, person.name)}>delete</button>
      </p>
    </div>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.personToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          deleteName={props.deleteName} />
      ))}
    </div>
  );
};

export default Persons;
