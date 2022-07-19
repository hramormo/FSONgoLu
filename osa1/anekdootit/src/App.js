import {useState} from 'react'

const Button = ({handleClick, text}) => (
  
  <button onClick={handleClick}>
   {text}
  </button>)

const Random = ({selected}) => {
  const s = selected
  let r = Math.floor(Math.random()*8)
  while (s===r) {
    r = Math.floor(Math.random()*8)
    
  }
  return r
}

const topAnecdote = ({votes}) =>{
const vList = votes
const topAnec = {
topVotes: 0,
topA: 0
}
for(let i=0;i<8;i++)
  if(topAnec.topVotes<vList[i])
    topAnec.topVotes=vList[i]
topAnec.topA = vList.findIndex((value)=>value===topAnec.topVotes)
return (topAnec)
}


const App = () => {
  const anecdotes = [
    'Brooks Law: "Adding manpower to a late software project makes it later!"',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Even the best planning is not so omniscient as to get it right the first time.',
    'Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Program testing can be used to show the presence of bugs, but never to show their absence!',
    'Good code is its own best documentation. As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed?’ Improve the code and then document it to make it even clearer.',
    'An organization that treats its programmers as morons will soon have programmers that are willing and able to act like morons only.'


  ]
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0]);
  const vote = (vote) => {
    const copy = [...votes]
    copy[vote] += 1
    setVotes([...copy])

  }
  const [selected, setSelected] = useState(0)
  const clickNext = (selected) => setSelected(Random)
  const clickVote = () => vote(selected)

  const topAnec = topAnecdote({votes})
  

  return(
    <div>
      <div>
        <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      
      </div>
      <Button handleClick={clickNext} text='Next anecdote'/>
      <Button handleClick={clickVote} text='Vote'/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[topAnec.topA]}</p>
      <p>has {topAnec.topVotes} votes</p>
    </div>
    
  )
}

export default App;
