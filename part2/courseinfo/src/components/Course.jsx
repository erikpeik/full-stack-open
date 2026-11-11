const Header = (props) => <h2>{props.course}</h2>;

const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => <strong>Number of exercises {props.total}</strong>;

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((s, p) => {
          return s + p.exercises;
        }, 0)}
      />
    </div>
  );
};

export default Course;
