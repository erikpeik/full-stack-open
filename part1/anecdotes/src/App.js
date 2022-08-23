import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const MostVotes = ({ anecdotes, points }) => {
	const index = points.indexOf(Math.max(...points));
	return [
		<div>{anecdotes[index]}</div>,
		<div>has {points[index]} points</div>
	]
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
	]

	const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
	const [points, addPoint] = useState(Array(anecdotes.length).fill(0))

	const addVote = (index) => {
		const copy = [...points]
		copy[index] += 1
		addPoint(copy)
	}

	const handleClick = () => {
		let random = Math.floor(Math.random() * anecdotes.length)
		while (random === selected) {
			random = Math.floor(Math.random() * anecdotes.length)
		}
		setSelected(random)
	}

	return (
	<div>
		<Header text="Anecdote of the day" />
		<div>{anecdotes[selected]}</div>
		<div>has {points[selected]} points</div>
		<button onClick={() => addVote(selected)}>vote</button>
		<button onClick={handleClick}>next anecdote</button>
		<Header text="Anecdote with most votes" />
		<MostVotes anecdotes={anecdotes} points={points} />
	</div>
	)
}

export default App;
