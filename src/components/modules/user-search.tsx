'use client'

// components
import { Input } from '@/components/ui/input'

// svg
import { Search } from 'lucide-react'

// utils
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const UserSearch = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <div className="relative mt-1">
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <div>
          <Search />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/search/${inputValue}`)
        }}
      >
        <Input
          className="pl-12"
          placeholder="Search Devbook"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type="submit" hidden />
      </form>
    </div>
  )
}
