import { useState } from 'react'

const Header = props => <div><h1>{props.value}</h1></div>
const Display = props => <div>{props.text} {props.value}</div>

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const handleClick=(setValue,value) => {
  const handle=() => setValue(value+1)
  return handle
}

  return (
    <div>
      <Header value='give feedback' />
      <Button handleClick={handleClick(setGood,good)} text='good' />
      <Button handleClick={handleClick(setNeutral,neutral)} text='neutral' />
      <Button handleClick={handleClick(setBad,bad)} text='bad' />
      <Header value='statstics' />
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />

    </div>
  )
}

export default App