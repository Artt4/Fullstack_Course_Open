import { useAnecdoteActions } from '../store'
import { useNotificationAction } from '../notificationStore'


const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const notify = useNotificationAction()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await add(content)
    notify(`You created '${content}'`)
    e.target.reset()
  }

  return (

    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
