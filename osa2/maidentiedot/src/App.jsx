import { useState, useEffect } from 'react'
import axios from 'axios'
import Maadata from './components/maadata'
import Filter from './components/filter'

const App = () => {
  const [maat, setMaat] = useState([])
  const [display, setDisplay] = useState([])
  const [maaFilter, setMaaFilter] = useState('')


  useEffect(()=> {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      console.log('promise success')
      console.log(response.data)
      setDisplay(response.data)
      
    })
  },[])

  const handleFilter = (event) => {
    setMaaFilter(event.target.value)
    if (maaFilter) {
    const reg = new RegExp( maaFilter, 'i')
    const filteredMaat = () => display.filter(maa => maa.name.common.match(reg))
    setMaat(filteredMaat)}
  }

  return (

      <div>
        <Filter value={maaFilter} onChange={handleFilter} />
        <Maadata maat={maat} setMaat={setMaat}/>
        
      </div>


  )
}

export default App
