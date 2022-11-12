// 定义Header
const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    let lists = props.parts
    return (
      <div>
        <p>{lists[0].name} {lists[0].exercises}</p>
        <p>{lists[1].name} {lists[1].exercises}</p>
        <p>{lists[1].name} {lists[1].exercises}</p>
      </div>
    )
  }
  
  const Total = (props) => {  
    return (
      <div>
        <p>
          Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} 
        </p>
      </div>
    )
  }
  
  
  const App = () => {
    const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
  
      </div>
    )
  }
  
  export default App
  
  