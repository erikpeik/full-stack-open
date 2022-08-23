import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const Button = props => (
	<button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = props => (
	<tr>
		<td>{props.text}</td>
		<td>{props.value}</td>
	</tr>
)

const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad;
	const average = (props.good - props.bad) / total;
	const positive = (props.good / total) * 100 + " %";

	if (total === 0) {
		return <div>No feedback given</div>
	} else {
	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={props.good} />
				<StatisticLine text="neutral" value={props.neutral} />
				<StatisticLine text="bad" value={props.bad} />
				<StatisticLine text="all" value={total} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={positive} />
			</tbody>
		</table>
	)}
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<Header text="give feedback" />
			<Button text="good" handleClick={() => setGood(good + 1)} />
			<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button text="bad" handleClick={() => setBad(bad + 1)} />
			<Header text="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App;
