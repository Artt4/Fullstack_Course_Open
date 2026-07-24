import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotification from './useNotification'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { displayNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      displayNotification(`anecdote '${variables.content}' created`)
    },
    onError: (error) => {
      displayNotification(error.message)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      displayNotification(`anecdote '${variables.content}' voted`)
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  return {
      anecdotes: result.data,
      isPending: result.isPending,
      isError: result.isError,
      addAnecdote: (content) =>
        newAnecdoteMutation.mutate({ content, votes: 0 }),
      voteAnecdote: (anecdote) =>
        updateAnecdoteMutation.mutate({
          ...anecdote,
          votes: anecdote.votes + 1,
        }),
    }
}
