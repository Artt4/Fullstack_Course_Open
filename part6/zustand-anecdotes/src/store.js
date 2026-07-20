
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: content => set(
      state => ({ anecdotes: state.anecdotes.concat(asObject(content)) })
    ),
    likesCounter: id => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        )
      })
    ),
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter != '') {
    return anecdotes.filter(n =>
        n.content.toLowerCase().includes(filter.toLowerCase())
      )
  }
  return anecdotes
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
