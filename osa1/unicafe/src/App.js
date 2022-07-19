import {useState} from 'react'

const Button = ({handleClick, text}) => (
  
  <button onClick={handleClick}>
    {text}
  </button>)

//const StatisticLine = ({text, value}) => {text+value}

const Statistics = ({good, neutral, bad}) => {
  const g=good
  const n=neutral
  const b=bad

  const totalClicks = (g+n+b);
  const avg = (g-b/totalClicks)
  const goodRate = (g/totalClicks*100);
  const data = [{text: 'good: ', value:g},{text:'neutral: ',value:n},{text:'bad: ',value:b},{text:'all: ',value:totalClicks},{text:'average: ',value:avg},{text:'positive: ',value:(goodRate+' %')}]
 // const values = [{good},{neutral},{bad},{totalClicks},{avg},{goodRate}]
  
    
  
  if(totalClicks===0)
  return('No feedback given')

  return(
    <table>
    <tbody>
      {data.map(data => (

        <tr key={data.text}>
          <td>{data.text}</td>
          <td>{data.value}</td>
        </tr>))}
        </tbody>
        </table>
      )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App;
