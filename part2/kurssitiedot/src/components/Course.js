// 定义Header
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// 定义展示内容的函数
const showContent = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.parts.map(list => <p key={list.id}>{list.name} {list.exercises}</p>)}
      <p>Total of {props.parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</p>
    </div>
  )
}

  
const Content = (props) => {
  return (
  props.props.map(
    content => <div key={content.id}>{showContent(content)}</div>
  )
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course='Web development curriculum' />
      <Content props={course} />
    </div>
  )
}

export default Course

