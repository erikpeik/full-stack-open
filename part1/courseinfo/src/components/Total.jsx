const Total = ({ parts }) => {
  const sum = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {sum}</p>;
};

export default Total;
