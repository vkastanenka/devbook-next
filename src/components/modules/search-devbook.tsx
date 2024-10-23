'use client'

// components
import { Input } from '@/components/ui/input'

// svg
import { Search } from 'lucide-react'

// utils
import { useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLayoutStore } from '@/src/hooks/use-layout-store'
import { getManyUsers } from '@/src/lib/actions/auth'

// types
import { GetManyUsersResponseData } from '@/src/lib/types'

export const SearchDevbook = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const q = searchParams.get('q')

  const {
    setSearchDevbookInputRef,
    searchDevbookInputValue,
    setSearchDevbookInputValue,
    setSearchDevbookResults,
  } = useLayoutStore()

  useEffect(() => {
    const setDevbookSearchOnLoad = async (q: string) => {
      const responseData = await getManyUsers(q)
      if ((responseData as GetManyUsersResponseData).data?.length) {
        setSearchDevbookResults((responseData as GetManyUsersResponseData).data)
      }
    }

    if (pathname === '/search' && q) {
      setSearchDevbookInputValue(q)
      setDevbookSearchOnLoad(q)
    } else {
      setSearchDevbookInputValue('')
    }
  }, [pathname, q, setSearchDevbookInputValue, setSearchDevbookResults])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      setSearchDevbookInputRef(inputRef)
    }
    return () => setSearchDevbookInputRef(null)
  }, [inputRef, setSearchDevbookInputRef])

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
          if (pathname !== '/search') {
            router.push(`/search/?q=${searchDevbookInputValue}`)
          }
        }}
      >
        <Input
          ref={inputRef}
          className="pl-12"
          placeholder="Search Devbook"
          value={searchDevbookInputValue}
          onChange={(e) => setSearchDevbookInputValue(e.target.value || '')}
        />
        <input type="submit" hidden />
      </form>
    </div>
  )
}
