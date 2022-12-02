import { useState } from 'react'
import Person from './components/Person'

const Filter = ({ name, value, onChange }) => {
  return (
    <div>
      filter shown with:
      <input
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          // 为 <input> 添加 name 属性后可通过 <form> 读取出值
          name={newName}

        // 这个 <input> 不需要再是受控组件了
        // value={newName}
        // onChange={handlePersonChange}
        />
      </div>
      <div>
        number:
        <input
          name={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons,shownPerson}) => {
  const personsToShow = persons.filter(person => person.name.search(new RegExp(shownPerson, 'i')) !== -1)

  return (
    <div>
      {personsToShow.map((person) => (
        /** person 有一个 id 了，为什么不用 id 做 key 呢 */
        <Person key={person.id} person={person} />
      ))}
    </div>
  )

}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [shownPerson, setShownPerson] = useState('')

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
  const addPerson = (event) => {
    event.preventDefault();

    // 可以通过这种方式读出值
    const newPersonNameFromForm = event.target.newName.value;
    const newPersonNumberFromForm = event.target.newNumber.value;

    // 不需要先就构造这个 object
    // const personObject = {
    //   name: newName,
    // };

    // 这就是 imperative 的编程习惯，为了达成某样目的，通过代码一步步指导如何做
    // 以及为了存储判断的值，需要在实际业务的上层 scope 去留存一个变量
    // 有语法错误哈😅
    // doesItExist / isExisting / itExists
    // let isExists = 0;
    // persons.forEach((person) => {
    //   if (person.name === newName) {
    //     isExists += 1;
    //   }
    // });
    // 不是说 imperative 不好，都是达成同样的效果
    // 想像成手动挡和自动挡吧

    // 目的是检查 persons 里是是否有某项的 name 与提交的值相等，可以用 Array.prototype.some() 方法
    // 见 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    const isExistingPerson = persons.some((person) => {
      return person.name === newPersonNameFromForm;
    })

    // 还有一个方法是 Array.prototype.every()，是检查 persons 里每一项是否都如何如何

    // if (isExists === 0) {
    //   setPersons(persons.concat(personObject));
    //   setNewName('');
    // } else {
    //   alert(`${newName} is already added to phonebook `);
    // }

    // 注意 true/false，我们判断的是 persons 里是否已经有了提交的名字
    // if 里的判断和 if/else 对应执行的逻辑要符合业务
    if (!isExistingPerson) {
      // 此处再去构造要添加的新 person
      // id 不要遗漏了
      setPersons(
        persons.concat({
          name: newPersonNameFromForm,
          number: newPersonNumberFromForm,
          id: persons.length + 1,
        })
      )
      // 通过 DOM 去删掉 <input> 的值
      event.target.newName.value = ''
      event.target.newNumber.value = ''
    } else {
      alert(`${newPersonNameFromForm} already exists. `);
    }
  }

  // 使用 ref 或通过 <form> onSubmit 去读取值，这里不需要了
  // const handlePersonChange = (event) => {
  //   console.log(event.target.value);
  //   setNewName(event.target.value);
  // };
  const handleShownNameChange = (event) => {
    console.log(event.target.value)
    setShownPerson(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name='shownName' value={shownPerson} onChange={handleShownNameChange} />
      <h3>Add a new</h3>
      <PersonForm newName="newName" newNumber="newNumber" addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} shownPerson={shownPerson} />
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