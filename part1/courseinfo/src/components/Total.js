import React from 'react';

const Total = ({ parts }) => {
  const getTotal = () => {
    return parts.reduce((acc, curr) => acc + curr.exercises, 0);
  };

  return <p>Number of exercises {getTotal()}</p>;
};

export default Total;
