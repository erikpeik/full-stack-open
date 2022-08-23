import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
	if (languages !== undefined) {
		const language_array = Object.values(languages)
		return (language_array.map((language, i) => <li key={i}>{language}</li>))
	}
}

const Country = ({country}) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>
			<h2>languages</h2>
			<ul>
				<Languages languages={country.languages} />
			</ul>
			<img src={country.flag} alt="flag" height="150" />
		</div>
	)
}

const CountryList = ({countries, filter}) => {
	const countriesFilter = countries.filter(country =>
		country.name.toLowerCase().includes(filter.toLowerCase())
	)

	if (countriesFilter.length > 10) {
		return <div>Too many matches, specify another filter</div>
	} else if (countriesFilter.length === 1) {
		return <Country country={countriesFilter[0]} />
	}
	return (
		<div>
		{countriesFilter.map((country, i) => <div key={i}>{country.name}</div>)}
		</div>
	)
}


const App = () => {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				const names = response.data.map(country => {
					return {
						name: country.name.common,
						capital: country.capital,
						area: country.area,
						flag: country.flags.png,
						languages: country.languages,
					}
				})
				setCountries(names)
			})
	}, [])

	return (
		<div>
			<div>find counties <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
			</div>
			<CountryList countries={countries} filter={filter} />
		</div>
	)
}

export default App;
