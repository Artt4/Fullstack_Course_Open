import { create } from 'zustand'

const useCounterStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  incrementGood: () => set(state => ({ good: state.good + 1 })),
  incrementNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
  incrementBad: () => set(state => ({ bad: state.bad + 1 })),
}))

// the hook functions that are used elsewhere in app
export const useCounters = () => {
  return {
    good: useCounterStore(state => state.good),
    neutral: useCounterStore(state => state.neutral),
    bad: useCounterStore(state => state.bad)
  }
}
export const useCounterButtons = () => {
  return {
    incrementGood: useCounterStore(state => state.incrementGood),
    incrementNeutral: useCounterStore(state => state.incrementNeutral),
    incrementBad: useCounterStore(state => state.incrementBad)
  }
}
