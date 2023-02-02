import Part from './Part';
import Total from './Total';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

export default Content;
