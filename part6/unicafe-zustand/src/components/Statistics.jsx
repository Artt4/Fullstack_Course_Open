import { useCounters } from '../store'

const Statistics = () => {
  const { good, neutral, bad } = useCounters()
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr><td>good</td><td>{good}</td></tr>
            <tr><td>neutral</td><td>{neutral}</td></tr>
            <tr><td>bad</td><td>{bad}</td></tr>
            <tr><td>all</td><td>{all}</td></tr>
            <tr><td>average</td><td>{average}</td></tr>
            <tr><td>positive</td><td>{positive + " %"}</td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Statistics
