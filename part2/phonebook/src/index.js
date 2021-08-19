import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import nameService from "./services/names";
import Error from "./components/error";
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([""]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPerson, setFilterPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    nameService
      .getAll()
      .then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one? `)) {
        
        const personFind = persons.find(p => p.name === newName);
        nameService
          .update(personFind.id,nameObject)
          .then(returnedName => {
            setPersons(persons.map(person => person.id !== personFind.id ? person : returnedName))
            setErrorMessage(
              `${nameObject.name} has been updated`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== personFind.id))
            setErrorMessage(
              `information of ${newName} has already been deleted from the server `
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }

    } else {
      nameService
        .create(nameObject)
        .then((returnedName) => {
          setPersons(persons.concat(returnedName));
          setErrorMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteName = (id,name) => {

    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      nameService
        .destroy(id)
        .then(returnedName => {
        setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage}/>
      <Filter
        filterPerson={filterPerson}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personToShow={personToShow}
        person={persons}
        deleteName={deleteName}
        />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
