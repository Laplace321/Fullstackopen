import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = ({ value, onChange }) => {
  return (
    <div>
      <label>find countries</label>
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

const ShowMatches = ({ countries, shownCountries }) => {
  const countriesToShow = countries.filter(country => country.name.common.search(new RegExp(shownCountries, 'i')) !== -1)
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    )

  }
  else if (countriesToShow.length === 1) {
    const languageList = Object.entries(countriesToShow[0].languages)
    console.log(languageList[0])

    return (
      <div>
        <h1>{countriesToShow[0].name.common}</h1>
        <p>
          capital:{countriesToShow[0].capital}<br></br>
          area:{countriesToShow[0].area}
        </p>
        <h2>languages:</h2>
        <ul>
          {languageList.map(value => (
            <li key={value[0]}>{value[1]}</li>
          ))}
        </ul>
        <img
          src={countriesToShow[0].flags.svg}
          alt={countriesToShow[0].name}
        />
      </div>

    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])

  const [shownCountries, setShownCountries] = useState('')

  const handleshownCountriesChange = (event) => {
    console.log(event.target.value)
    setShownCountries(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <FindCountries value={shownCountries} onChange={handleshownCountriesChange} />
      <ShowMatches countries={countries} shownCountries={shownCountries} />
    </div>
  )

}

export default App;
