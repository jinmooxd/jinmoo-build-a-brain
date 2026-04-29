import { create } from 'zustand'

type AttendedState = {
  durations: Record<string, number>
  complete: boolean
  recordExposure: (id: string, amount: number) => void
  reset: () => void
  markComplete: () => void
  topAttended: (limit: number) => string[]
}

export const useAttendedItemsStore = create<AttendedState>((set, get) => ({
  durations: {},
  complete: false,
  recordExposure: (id, amount) =>
    set((state) => ({
      durations: {
        ...state.durations,
        [id]: (state.durations[id] ?? 0) + amount,
      },
    })),
  reset: () => set({ durations: {}, complete: false }),
  markComplete: () => set({ complete: true }),
  topAttended: (limit) =>
    Object.entries(get().durations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id),
}))
