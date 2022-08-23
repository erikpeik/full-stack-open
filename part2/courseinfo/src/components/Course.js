const Header = ({ course }) => <h3>{course}</h3>

const Total = ({ parts }) => {
	const sum = parts.reduce((accumulator, object) => {
		return accumulator + object.exercises;
	}, 0)
	return <b>Number of {sum} exercises</b>
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
	parts.map(part => <Part key={part.id} part={part} />)
)


const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course
