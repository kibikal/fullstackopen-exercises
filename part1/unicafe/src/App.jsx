import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine
          text="average"
          value={
            props.all > 0
              ? (props.good * 1 + props.neutral * 0 + props.bad * -1) /
                props.all
              : 0
          }
        />
        <StatisticLine
          text="positive"
          value={props.all > 0 ? (props.good / props.all) * 100 + "%" : 0}
        />
      </tbody>
    </table>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => {
          const updatedGood = good + 1;
          setGood(updatedGood);
          setAll(updatedGood + neutral + bad);
        }}
        text="good"
      />
      <Button
        handleClick={() => {
          const updatedNeutral = neutral + 1;
          setNeutral(updatedNeutral);
          setAll(good + updatedNeutral + bad);
        }}
        text="neutral"
      />
      <Button
        handleClick={() => {
          const updatedBad = bad + 1;
          setBad(updatedBad);
          setAll(good + neutral + updatedBad);
        }}
        text="bad"
      />
      <h2>Statistics</h2>
      {all > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
