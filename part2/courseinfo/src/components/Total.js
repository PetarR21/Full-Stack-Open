const Total = ({ parts }) => {
  return (
    <p>
      <strong>total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</strong>
    </p>
  );
};

export default Total;
