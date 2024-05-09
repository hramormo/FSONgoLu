import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note.jsx'
import Notification from './components/Notification.jsx'
import noteService from './services/notes'



const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return(
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}


const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true)
const [errorMessage, setErrorMessage] = useState(null)

/*const hook = ()=>{
  console.log('effect')
  axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
}*/

const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = {...note,important:!note.important}
  //console.log('importance of'+id+'needs to be toggled')

  noteService
  .update(id, changedNote)
  .then(returnedNote => {
    setNotes(notes.map(note=>note.id!==id?note:returnedNote))
  })
  .catch(error => {
    /*alert(`the note '${note.content}' was already deleted from server`
    )*/
    setErrorMessage(`Note '${note.content}' was already removed from the server`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })

}

useEffect(() => {
  noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
}, [])



console.log('render', notes.length, 'notes')

const addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    //date: new Date().toISOString(),
    important: Math.random() > 0.5,
    //id: notes.length +1,
  }
  noteService
  .create(noteObject)
  .then(returnedNote => {
    setNotes(notes.concat(returnedNote))
    setNewNote('')
  })
  /*setNotes(notes.concat(noteObject))
  setNewNote('')*/
}
const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}
const notesToShow = showAll
? notes
:notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}/>
          )}
      </ul>
      <form onSubmit={addNote}>
        <input
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App