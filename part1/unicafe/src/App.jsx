import { useState } from "react";

const Display = (props) => (
  <div>
    {props.rating} {props.value}
  </div>
);
const Statistics = ({ good, neutral, bad }) => {
  const allRatings = good + neutral + bad;
  const average = (good - bad) / allRatings || 0;
  const positive = (good / allRatings) * 100 || 0;

  if (allRatings === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <Display rating="good" value={good} />
        <Display rating="neutral" value={neutral} />
        <Display rating="bad" value={bad} />
        <Display rating="all" value={allRatings} />
        <Display rating="average" value={average} />
        <Display rating="positive" value={positive + " %"} />
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
