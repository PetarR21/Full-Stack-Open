const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);
  return (
    <p>
      total of <strong>{total}</strong> exercise{total === 1 ? '' : 's'}
    </p>
  );
};

export default Total;
