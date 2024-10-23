// utils
import { create } from 'zustand'

interface LayoutStore {
  searchDevbookInputRef: React.RefObject<HTMLInputElement> | null
  setSearchDevbookInputRef: (
    value: React.RefObject<HTMLInputElement> | null
  ) => void
  searchDevbookInputValue: string
  setSearchDevbookInputValue: (value: string) => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  searchDevbookInputRef: null,
  setSearchDevbookInputRef: (value: React.RefObject<HTMLInputElement> | null) =>
    set({ searchDevbookInputRef: value }),
  searchDevbookInputValue: '',
  setSearchDevbookInputValue: (value = '') =>
    set({ searchDevbookInputValue: value }),
}))
