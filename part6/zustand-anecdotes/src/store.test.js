import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [] })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from the backend', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'If it hurts, do it more often', votes: 0 },
      { id: '2', content: 'Adding manpower to a late software project makes it later!', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
  it('returns anecdotes sorted by votes', () => {
    const unsortedAnecdotes = [
      { id: '1', content: 'Low votes', votes: 1 },
      { id: '2', content: 'High votes', votes: 10 },
      { id: '3', content: 'Medium votes', votes: 5 }
    ]

    useAnecdoteStore.setState({ anecdotes: unsortedAnecdotes, filter: '' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current[0].votes).toBe(10)
    expect(result.current[1].votes).toBe(5)
    expect(result.current[2].votes).toBe(1)
  })
})
