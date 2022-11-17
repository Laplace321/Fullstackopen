import { useState } from 'react'

const Header = props => <div><h1>{props.value}</h1></div>
//const Statistics = props => <div>{props.text} {props.value}</div>

 // const handleClick = (setValue, value) => () => setValue(value + 1)
  // 该写法可能存在出现bug的隐患 更好的写法如下:
  const handleClick = (setValue, value) => () => setValue(prevValue => prevValue + 1)
  const Display = props => <div>{props.text} {props.value}</div>


const Statistics = (props) => {
  if(props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Header value='statstics' />
      <Display text='good' value={props.good} />
      <Display text='neutral' value={props.neutral} />
      <Display text='bad' value={props.bad} />
      <Display text='all' value={props.bad + props.good + props.neutral} />
      <Display text='average' value={( props.good - props.bad  )/(props.bad + props.good + props.neutral)} />
    </div>


  )
}

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


  return (
    <div>
      <Header value='give feedback' />
      <Button handleClick={handleClick(setGood,good)} text='good' />
      <Button handleClick={handleClick(setNeutral,neutral)} text='neutral' />
      <Button handleClick={handleClick(setBad,bad)} text='bad' />
      <Statistics 
      all = {bad + good + neutral}
      good={good}
      bad={bad}
      neutral={neutral}

      
      
      
      />
    </div>

  )
}

export default App