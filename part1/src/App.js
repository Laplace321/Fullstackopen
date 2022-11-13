import { useState } from 'react'

// const Display = ({ counter }) => {
//   return (
//     <div>{counter}</div>
//   )
// }

const Display = ({ counter }) => <div>{counter}</div>


const Button = ({onClick,text}) => {
  return (
    <button onClick = {onClick}>
      {text}
    </button>
  )
}



const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreseByOne = () => setCounter(counter - 1)

  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text='plus' />
      <Button onClick={setToZero} text='zero' />
      <Button onClick={decreseByOne} text='minus' />

    </div>
  )
}
export default App