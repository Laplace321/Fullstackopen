import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'

// Filter：用于过滤显示的名单
const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label >filter shown with:</label>
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

// PersonFromNew：处理addPerson
const PersonFromNew = ({ addPerson }) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    // 可以通过这种方式读出值
    const newPersonNameFromForm = event.target.personName.value
    const newPersonNumberFromForm = event.target.personNumber.value

    addPerson(newPersonNameFromForm, newPersonNumberFromForm)

    event.target.personName.value = ''
    event.target.personNumber.value = ''

  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input name="personName" />
      </div>
      <div>
        number:
        <input name="personNumber" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, shownPerson,deleteState }) => {

  const personsToShow = persons.filter(person => person.name.search(new RegExp(shownPerson, 'i')) !== -1)

  return (
    <div>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} deleteState={deleteState} />
      ))}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [shownPerson, setShownPerson] = useState('')
  const [notification,setNotification] = useState(null)
  // const [notExistingNotification,setNotExistingNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // 这里是个常见的误区：跟踪不必要的状态
  // 这个程序只有在最后点 add 的时候才需要检查用户提交的名字是否在 persons 里
  // 而有这个 newName 的状态后，一旦其有变化，整个组件会重新渲染
  // 如果不使用 <form>，则这里需要使用的是 useRef（如果还没学到就忽略）
  // const [newName, setNewName] = React.useState('');

  // 你使用了 <form> 标签
  // 实际上 DOM 规范里 <form> 已经把其中各 <input> 的值一并包含
  // 见 MDN https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#additional_features:~:text=Name%20of%20the%20form%20control.%20Submitted%20with%20the%20form%20as%20part%20of%20a%20name/value%20pair
  // 所以只要为 <input> 添加 name 属性（见下），那么 onSubmit 的 event
  // 其 target（即 <form>）就会有对应 name 的属性（即对应的 <input>）
  // 再通过 .value 就可以读出 <input> 的值
  const addPerson = (name, number) => {
    const isExistingPerson = persons.some((person) => {
      return person.name === name;
    })
    const showNotification = (name) => {
      setNotification(`${name} Added`)
      setTimeout(()=>setNotification(null),2000)
    }


    if (!isExistingPerson) {
      const newPerson = {
        name: name,
        number: number,
        // id: persons.length + 1,
      }


      personService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
        .then(() => showNotification(name))
    } else if(window.confirm(`${name} already exists,replace the old number with a new one?`)){
      const person = persons.find(n => n.name === name)
      const changePerson = {...person,number:number}
      const showNotExistingNotification = (name) => {
        setNotification(`Information of ${name} has already been removed from server`)
        setTimeout(()=>setNotification(null),2000)
      }

      personService
        .update(changePerson.id,changePerson)
        .then(() => updateState(changePerson.id,changePerson))  
        .then(() => showNotification(name))
        .catch(error => {
          showNotExistingNotification(name)
        }
        )

    } 
  }



  const handleShownNameChange = (event) => {
    console.log(event.target.value)
    setShownPerson(event.target.value)
  }

  const deleteState = (id) => {
    setPersons(persons => persons.filter(p => p.id !== id))
  } 

  const updateState = (id,newPerson) => {
    setPersons(persons => persons.filter(p => p.id !== id))
    setPersons(persons.map(person=>person.id !== id ? person : newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={shownPerson} onChange={handleShownNameChange} />
      <h3>Add a new</h3>
      <PersonFromNew addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} shownPerson={shownPerson} deleteState={deleteState}/>
    </div>
  )
}

// 你会看到一些观点，例如 React 中不应该过多使用 DOM 去操作 UI
// 尤其是本例中 <form> onSubmit event.target.newName.value = ""
// 这里使用 DOM API 的理由是 <input> 本身的状态并不需要去关心
// 实际上，就算不用 <form>，用 useRef 也是个更好的选择
// 组件一旦复杂起来，因为某个 state 导致重新渲染是很麻烦的
// 特别是搜索、输入时的高频变动

// 有空可以看看 Web Dev Simplified 关于 React 和原生 JS 的短视频
// 虽然不全面，但是有些要点讲得挺清楚的

// 如果有兴趣可以看看 Rich Harris 的演讲 Rethinking reactivity
// https://www.youtube.com/watch?v=AdNJ3fydeao
// 他是前纽约时报前端做数据展示的，因为不满 React 的性能，写了 Svelte。

export default App