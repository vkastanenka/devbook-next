// utils
import { create } from 'zustand'

interface LayoutStore {
  searchDevbookInputValue: string
  setSearchDevbookInputValue: (inputValue: string) => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  searchDevbookInputValue: '',
  setSearchDevbookInputValue: (value = '') =>
    set({ searchDevbookInputValue: value }),
}))
