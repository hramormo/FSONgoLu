import Maa from './maa'

const Maadata = ({maat, setMaat}) =>  {
  if(maat.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )}
  else if ((maat.length > 2 && maat.length < 10) || maat.length ===0){
      return(
        <ul>
          {maat.map((maa, key) =>
          <li key={key}>{maa.name.common} <button onClick={() => setMaat([maa])}>show</button></li>
          )}
        </ul>
      )
    }
  else {
        return(<Maa maa={maat[0]}/>
        )
      }
    }

    export default Maadata