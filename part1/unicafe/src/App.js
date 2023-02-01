import { useState } from 'react';

const Button = ({ text, value, setValue }) => {
  return (
    <button
      onClick={() => {
        setValue(value + 1);
      }}
    >
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100 + '%';

  return (
    <div>
      <h1>statistics</h1>
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text='good' value={good} setValue={setGood} />
        <Button text='neutral' value={neutral} setValue={setNeutral} />
        <Button text='bad' value={bad} setValue={setBad} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
