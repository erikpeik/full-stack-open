import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
	if (languages !== undefined) {
		const language_array = Object.values(languages)
		return (
			<div>
				<h2>languages</h2>
				<ul>
				{language_array.map((language, i) => <li key={i}>{language}</li>)}
				</ul>
			</div>
			)
	}
}

const Weather = ({capital, latlng}) => {
	const api_key = process.env.REACT_APP_API_KEY
	const [weather, setWeather] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const params = {
			lat: latlng[0],
			lon: latlng[1],
			appid: api_key,
		}

		axios
			.get("http://api.openweathermap.org/data/2.5/weather", { params })
			.then(response => {
				setWeather(response.data)
				setIsLoading(false)
			})
			.catch(error => {
				console.log(error)
			})
	}, [api_key, latlng])

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h3>Weather in {capital}</h3>
			<div>temperature: {(weather.main.temp - 273.15).toFixed(2) + " Celsius"}</div>
			<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather icon" />
			<div>wind {weather.wind.speed} m/s</div>
		</div>
	)
}

const BasicData = ({country}) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>
		</div>
	)
}

const Country = ({country}) => {
	return (
		<div>
			<BasicData country={country} />
			<Languages languages={country.languages} />
			<img src={country.flag} alt="flag" height="150" />
			<Weather capital={country.capital} latlng={country.latlng} />
		</div>
	)
}

const CountryList = ({countries, filter, setFilter}) => {
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
			{countriesFilter.map((country, i) =>
				<div key={i}>
					{country.name} <button
					style={{margin: '0px'}}
					onClick={() => setFilter(country.name)}>show</button>
				</div>
				)}
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
						latlng: country.capitalInfo.latlng
					}
				})
				setCountries(names)
			})
	}, [])

	return (
		<div>
			<div>find counties <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
			</div>
			<CountryList countries={countries} filter={filter} setFilter={setFilter} />
		</div>
	)
}

export default App;
