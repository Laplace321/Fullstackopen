import personService from '../services/persons'

const Person = ({ person,deleteState }) => {
  const deletePerson = (event) => {
    event.preventDefault()
    if (window.confirm("Do you really want to delete?")) {
      personService
        .deletePerson(person.id)
        .then(() => { deleteState(person.id) })
        .catch(error => {
          console.log(person.id)
        })
    }
  }

    return (
      <div>
        <form onSubmit={deletePerson}>
          {/* 或者是写在一行 <p>{person.name} {person.number} <button type="submit">delete</button> </p>           */}
          <p>
          {person.name}
          {" "}
          {person.number}
          <button type="submit">delete</button>
          </p>
        </form>  
      </div>
    )
  }
  
  export default Person