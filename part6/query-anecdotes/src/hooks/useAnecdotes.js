import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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
