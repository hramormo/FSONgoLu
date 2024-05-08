import Number from './number'

const Listings = ({display, removePerson}) => {
    return(
  <div>
    {display.map(person => 
    <Number 
    key={person.name} 
    person={person}
    removePerson={removePerson}/>)} 
  </div>
      )
  }

export default Listings