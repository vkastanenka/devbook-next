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

export const SearchForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isMobileFormOpen, setIsMobileFormOpen] = useState<boolean>(false)

  const {
    setSearchDevbookInputRef,
    searchDevbookInputValue,
    setSearchDevbookInputValue,
    searchDevbookResults,
    setSearchDevbookResults,
  } = useLayoutStore()

  const action = async () => {
    if (pathname !== '/search' && searchDevbookInputValue) {
      router.push(`/search/?q=${searchDevbookInputValue}`)
      return
    }

    setIsSubmitting(true)

    if (searchDevbookResults) {
      await setSearchDevbookResults(null)
    }

    const response = await searchDevbook({ query: searchDevbookInputValue })

    setIsSubmitting(false)

    if (!response.data && response.statusCode !== 404) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
      setSearchDevbookResults([])
      return
    }

    if (!response.data && response.statusCode === 404) {
      setSearchDevbookResults([])
      return
    }

    if (!response.data) return

    await setSearchDevbookResults(response.data)
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
    const search = async () => {
      // If query parameter on load, set input to layoutStore and perform get req
      if (pathname === '/search' && q && formRef?.current) {
        await setSearchDevbookInputValue(q)
        formRef.current.requestSubmit()
      } else {
        await setSearchDevbookInputValue('')
        await setSearchDevbookResults(null)
      }
    }
    search()
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
          'transition-opacity md:transition-none px-[20px] md:px-0 bg-card md:bg-transparent fixed top-0 left-0 w-full py-4 md:w-auto md:py-0 md:mt-1 block md:relative md:block border-b md:border-0 shadow-sm md:shadow-none',
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
            disabled={isSubmitting}
            placeholder="Search Devbook"
            value={searchDevbookInputValue}
            onChange={(e) => setSearchDevbookInputValue(e.target.value || '')}
            onBlur={() => {
              if (isMobileFormOpen) setIsMobileFormOpen(false)
            }}
          />
          <input type="submit" hidden />
        </form>
      </div>
    </>
  )
}
