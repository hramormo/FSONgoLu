const Additions = (props) =>{
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
}

export default Additions