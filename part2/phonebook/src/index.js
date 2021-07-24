import React, { useState } from "react";
import ReactDOM from "react-dom";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPerson, setFilterPerson] = useState("");

  const personToShow = persons.find((person) => person.name === filterPerson)
    ? persons.filter((person) => person.name === filterPerson)
    : persons;

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const Person = ({ person }) => {
    return (
      <div>
        <p>
          {person.name} {person.number}
        </p>
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={filterPerson} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
