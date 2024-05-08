const Filter = ({filter,handler}) => {
    return (
    <div>only show entries whose names contain
      <input value={filter} onChange={handler}/>
      </div>)
  }

export default Filter