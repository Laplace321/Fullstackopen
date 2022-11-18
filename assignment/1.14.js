import { useState } from 'react'


const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}

  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => setSelected(prevSelected => Math.floor(Math.random()*anecdotes.length))
  //const vote = () => setPoints(prevCopy => setPoints[selected] += 1)
  const vote = () => {
    let copy = [...points]
    copy[selected] += 1
  
   // 正确用法
   setPoints(copy) 
   // 错误用法
   // setPoints(prevPoints => copy) 
   // Q1:为啥这里用第二种写法不行
   // Q2:为啥需要用copy复制一份状态数组，不能直接对数组进行处理
  }

//  <p>{anecdotes[(Math.max(points))]}</p>

  // const getMaxVote = (anecdotes,points) => {
  //   return {
  //     anecdotes
  //   }
  // }
  //  console.log(vote.toString().indexOf('2'))
  //  console.log(points.indexOf(Math.max(...points)))
      console.log(points)
  return (
    
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={nextAnecdote} text='next anecdote' />
      <Button handleClick={vote} text='vote' />
      {/* <p>{points}</p> */}
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>has {Math.max(...points)} votes</p>

    </div>

  )
}
export default App