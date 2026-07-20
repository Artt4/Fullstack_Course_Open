import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationAction } from '../notificationStore'


const AnecdoteList = () => {
  const { likesCounter } = useAnecdoteActions()
  const anecdotes = useAnecdotes()
  const notify = useNotificationAction()

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    likesCounter(anecdote.id)
    notify(`You voted '${anecdote.content}'`)
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
