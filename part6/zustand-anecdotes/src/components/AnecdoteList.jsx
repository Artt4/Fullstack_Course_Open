import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const { likesCounter } = useAnecdoteActions()
  const anecdotes = useAnecdotes()

  const vote = id => {
    console.log('vote', id)
    likesCounter(id)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
