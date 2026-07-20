import { create } from 'zustand'

const useNotificationStore = create((set, get) => ({
  message: '',
  timeoutId: null,
  notify: (message) => {
    const currentTimeoutId = get().timeoutId

    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId)
    }
    set({ message })

    const newTimeoutId = setTimeout(() => {
          set({ message: '' })
        }, 5000)
    set({ timeoutId: newTimeoutId })
  }
})
)

export const useNotificationValue = () => useNotificationStore((state) => state.message)
export const useNotificationAction = () => useNotificationStore((state) => state.notify)
