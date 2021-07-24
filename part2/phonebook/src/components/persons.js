import React from "react";

const Person = ({ person }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
    </div>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.personToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
