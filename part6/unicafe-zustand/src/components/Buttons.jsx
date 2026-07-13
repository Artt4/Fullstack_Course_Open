import { useCounterButtons } from '../store'

const Buttons = () => {

  const { incrementGood, incrementNeutral, incrementBad } = useCounterButtons()

  return (
    <div>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  )
}
export default Buttons
