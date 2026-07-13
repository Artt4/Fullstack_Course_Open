
import { useAnecdotes, useAnecdoteActions } from './store'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useAnecdotes()
  const { likesCounter } = useAnecdoteActions()


  const vote = id => {
    console.log('vote', id)
    likesCounter(id)

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
