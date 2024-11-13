'use client'

// actions
import { searchDevbook } from '@/src/actions/search-actions'

// components
import { Input } from '@/src/components/ui/input'

// svg
import { Search } from 'lucide-react'

// utils
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import { useLayoutStore } from '@/src/hooks/use-layout-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { ServerResponse } from '@/src/types/server-types'
import { User } from '@/src/types/user-types'

export const SearchForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [isMobileFormOpen, setIsMobileFormOpen] = useState<boolean>(false)

  const {
    setSearchDevbookInputRef,
    searchDevbookInputValue,
    setSearchDevbookInputValue,
    setSearchDevbookResults,
  } = useLayoutStore()

  const action = async () => {
    if (pathname !== '/search' && searchDevbookInputValue) {
      router.push(`/search/?q=${searchDevbookInputValue}`)
      return
    }

    const response = await searchDevbook({ query: searchDevbookInputValue })

    if (!response.success) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
      setSearchDevbookResults(null)
    }

    const { data } = response as ServerResponse<User[]>

    // If successful, set layoutStore
    if (data) {
      toast({
        title: 'Success!',
        description: response.message,
      })
      setSearchDevbookResults(data)
    }
  }

  // Set ref in state so other components can focus the input
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      setSearchDevbookInputRef(inputRef)
    }
    return () => setSearchDevbookInputRef(null)
  }, [inputRef, setSearchDevbookInputRef])

  // Create input ref to programmatically trigger action
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // If query parameter on load, set input to layoutStore and perform get req
    if (pathname === '/search' && q && formRef?.current) {
      setSearchDevbookInputValue(q)
      formRef.current.requestSubmit()
    } else {
      setSearchDevbookInputValue('')
      setSearchDevbookResults(null)
    }
  }, [
    formRef,
    pathname,
    q,
    setSearchDevbookInputValue,
    setSearchDevbookResults,
  ])

  return (
    <>
      <button
        className="button-text p-1 block md:hidden"
        onClick={() => {
          setIsMobileFormOpen((prevState) => !prevState)
          if (inputRef?.current) inputRef.current.focus()
        }}
      >
        <Search />
      </button>
      <div
        className={cn(
          'transition-opacity md:transition-none px-[20px] md:px-0 bg-card md:bg-transparent fixed top-0 left-0 w-full py-4 md:w-auto md:py-0 md:mt-1 block md:relative md:block',
          isMobileFormOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100'
        )}
      >
        <div className="absolute top-1/2 left-8 md:left-3 -translate-y-1/2">
          <div>
            <Search />
          </div>
        </div>
        <form ref={formRef} action={action} autoComplete="off">
          <Input
            name="query"
            ref={inputRef}
            className="pl-12"
            placeholder="Search Devbook"
            value={searchDevbookInputValue}
            onChange={(e) => setSearchDevbookInputValue(e.target.value || '')}
            onBlur={() => setIsMobileFormOpen(false)}
          />
          <input type="submit" hidden />
        </form>
      </div>
    </>
  )
}
