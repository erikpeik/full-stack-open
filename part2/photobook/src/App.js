import { useState } from 'react'

const Filter = ({value, onchange}) => {
	return (
		<div>
			filter show with:
			<input value={value} onChange={(e) => onchange(e.target.value)} />
		</div>
	)
}

const PersonForm = ({addUser, newName, newNumber, setNewName, setNewNumber}) => (
	<form onSubmit={addUser}>
		<div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
		<div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/></div>
		<div><button type="submit">add</button></div>
	</form>
)

const Persons = ({persons, filter}) => {
	const personsFilter = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	)

	return personsFilter.map((person, i) =>
		<div key={i}>{person.name} {person.number}</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const addUser = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
		}
		const names = persons.map(person => person.name)
		if (names.includes(newName)) {
			alert(`${newName} is already added to phonebook`)
		} else  {
			setPersons(persons.concat(personObject))
		}
		setNewName('')
		setNewNumber('')
	}

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter value={filter} onchange={setFilter} />

			<h3>Add a new</h3>

			<PersonForm
				addUser={addUser} newName={newName}
				newNumber={newNumber} setNewName={setNewName}
				setNewNumber={setNewNumber}
			/>

			<h3>Numbers</h3>

			<Persons persons={persons} filter={filter} />
		</div>
	)
}

export default App
