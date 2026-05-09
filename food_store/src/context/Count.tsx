import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CounterState = {
    count: number
    increment: () => void
    decrement: () => void
    removeAllBears: () => void
}

export const useBearStore = create<CounterState>()(
    persist(
        (set) => ({
            count: 1,
            increment: () => set((state) => ({ count: state.count === 20 ?  state.count : state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count <= 0 ?  0 : state.count - 1  })),
            removeAllBears: () => set({ count: 0 }),
        }),
        { name: "count" }
    )
)
