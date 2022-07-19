import {useState} from 'react'

const Hello = ({name, age}) => {
  
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}
const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )


const History = (props) => {
  if(props.allClicks.length ===0){
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }


return (
  <div>
    button press history: {props.allClicks.join(' ')}
  </div>
)
}
const App = () => {
  /*const nimi = 'Pekka'
  const ika = 10
return (
  <div>
    <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={nimi} age={ika} />
  </div>
)*/

const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)
const [allClicks, setAll] = useState([])

const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  setLeft(left + 1)
}

const handleRightClick = () => {
  setAll(allClicks.concat('R'))
  setRight(right + 1)
}




return(
  <div><div>
  {left}
<Button handleClick={handleLeftClick} text='left' />
<Button handleClick={handleRightClick} text='right' />
  {right}
  <History allClicks={allClicks} />
  </div>
</div>
)
}
export default App;
