import { useState, useEffect } from 'react'
import Number from './components/number.jsx'
import Additions from './components/Additions.jsx'
import Filter from './components/Filter.jsx'
import Listings from './components/Listings.jsx'
import axios from 'axios'
import perService from './services/persons.js'
import Error from './components/Error.jsx'
import Notification from './components/Notification.jsx'

/*const Listings = ({display}) => {
  return(
<div>
  {display.map(person => 
  <Number 
  key={person.name} 
  person={person}
  removePerson={removePerson}/>)} 
</div>
    )
}*/

/*const Number = ({person, removePerson}) => {
  const label = 'delete'
 return( <div>
  {person.name} {person.number}
  <button onClick={() => removePerson(person.id)}>{label}</button>
  </div>)

}*/
/*
const Filter = ({filter,handler}) => {
  return (
  <div>only show entries whose names contain
    <input value={filter} onChange={handler}/>
    </div>)
}*/

/*const Additions = (props) =>{
  return(<form onSubmit={props.addPerson}>
  <div>
    name: <input value={props.newName} onChange={props.namehandler}/>
    </div>
    <div>
    number: <input value={props.newNumber} onChange={props.numberhandler}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>)
}*/



const App = () => {
  const [persons, setPersons] = useState([/*
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
*/]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [display, setDisplay] = useState(persons)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  /*const hook = ()=>{
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
          setDisplay(response.data)
        })
  }*/

  useEffect(() => {
    perService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setDisplay(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const removePerson = (id) => {
    //const url = `http://localhost:3001/persons/${id}`
    const gonePerson = display.find(p => p.id === id)
    const goneId = gonePerson.id
    const goneName = gonePerson.name

  
    if (window.confirm(`Are you sure you want to delete ${goneName}?`)){
      perService
      .remove(goneId)
      .then(()=>{setMessage(`Removed ${goneName}`)
                setTimeout(()=> {setMessage(null)},5000)})
      .catch(error => {
      //alert(`the person '${goneName}' was already deleted from server`)
      setErrorMessage(`the person '${goneName}' was already deleted from server`)

    })
    setPersons(display.filter(p => p.id !== goneId))
    setDisplay(display.filter(p => p.id !== goneId))
    
  }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = display.filter((person) => person.name === newName)
    const newPerson= person[0]
    //const nameCheck = persons.map(person => person.name)
    //const newPerson = persons.find(p=> p.name === nameCheck)
    const changedPerson = {...newPerson,number:newNumber}
    if(/*nameCheck.includes(newName, 0)|nameCheck===''*/person.length !== 0){
    if(window.confirm(`${newName} is already in the phonebook, replace old number?`)){
      perService
      .update(changedPerson.id, changedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(personItem=> personItem.id !== newPerson.id? personItem : updatedPerson))
        setDisplay(display.map(personListing=> personListing.id !== newPerson.id? personListing : updatedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Updated number for ${updatedPerson.name}`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information on ${changedPerson.name} has already been removed from the server`)
        setTimeout(()=> {setErrorMessage(null)}, 5000)})
    }}
    else
    {const personObject = {
      name: newName,
      number: newNumber}

    

    perService
    .create(personObject)
    .then(addedPerson => {
      setPersons(persons.concat(addedPerson))
      setNewName('')
      setNewNumber('')
      setDisplay(display.concat(addedPerson))
      setMessage(`Added ${personObject.name}`)
      setTimeout(()=> {setMessage(null)}, 5000)
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
      setTimeout(()=> {setErrorMessage(null)}, 5000 )
    })}


  }
  

  const handleNameFieldChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberFieldChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
  const filtering = event.target.value

  if(filtering !==''){
  const display = persons.filter((person) => {
    return person.name.toLowerCase().includes(filtering.toLowerCase())
  })
  setDisplay(display)}
  else{
    setDisplay(persons)
  }
  setFilter(filtering)
}
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error errorMessage={errorMessage}/>
      <Filter filter={filter} handler={handleFilterChange}/>
      <h2>Add new listing</h2>
        <Additions addPerson={addPerson} newName={newName} newNumber={newNumber} namehandler={handleNameFieldChange} numberhandler={handleNumberFieldChange}/>
      <h2>Listings</h2>
      <Listings display={display} removePerson={removePerson}/>
    </div>
  )

}

export default App