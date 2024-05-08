
const Number = ({person, removePerson}) => {
    const label = 'delete'
   return( <div>
    {person.name} {person.number}
    <button onClick={() => removePerson(person.id)}>{label}</button>
    </div>)
  
  }

  export default Number