import React, { useState } from 'react'
import ReactDOM from "react-dom";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName  = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Person = ({person}) => {
    return (
      <div>
        <p>{person.name}</p>
      </div>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById("root"));