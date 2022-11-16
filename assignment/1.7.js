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

 // const handleClick = (setValue, value) => () => setValue(value + 1)
  // 该写法可能存在出现bug的隐患 更好的写法如下:
  const handleClick = (setValue, value) => () => setValue(prevValue => prevValue + 1)

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
      <Display text='all' value={bad + good + neutral} />
      <Display text='average' value={(bad*-1 + good*1  )/(bad + good + neutral)} />

    </div>
  )
}

export default App