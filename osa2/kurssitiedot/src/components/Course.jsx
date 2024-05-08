const Course =({course}) => {
    return (
      <div>
      <Header course={course.name} />
      <Content parts={course.parts}  />
      <Total parts={course.parts} />
    </div>
    )
  }
  
  const Header = ({course}) => {
    return(
      <div>
      <h2>{course}</h2>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
       {parts.map(part =>
       <Part key={part.id} part={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Part = ({part, exercises}) =>{
    return(
      <div>
      {part} {exercises}
      <br />
      </div>
    )
  }
  
  const Total = ({parts}) =>{
    const total = parts.reduce((prev, current) => prev + current.exercises, 0)
    
    return(
      <div>
        <b>Number of exercises {total}</b>
      </div>
    )
  }

  export default Course