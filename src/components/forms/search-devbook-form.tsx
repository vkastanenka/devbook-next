'use client'

// components
import { Input } from '@/components/ui/input'

// svg
import { Search } from 'lucide-react'

// utils
import { useEffect, useRef } from 'react'
import { useToast } from '@/src/hooks/use-toast'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLayoutStore } from '@/src/hooks/use-layout-store'
import { getManyUsers } from '@/src/lib/actions/auth'

// types
import { GetManyUsersResponseData } from '@/src/lib/types'

export const SearchDevbookForm = () => {
  const { toast } = useToast()
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

  const action = async () => {
    if (pathname !== '/search' && searchDevbookInputValue) {
      router.push(`/search/?q=${searchDevbookInputValue}`)
      return
    }

    const response = await getManyUsers(searchDevbookInputValue)

    if (!response.success) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
      setSearchDevbookResults(null)
    }

    // If successful, set layoutStore
    if (response.success) {
      toast({
        title: 'Success!',
        description: response.message,
      })
      setSearchDevbookResults((response as GetManyUsersResponseData).data)
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
    <div className="relative mt-1">
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <div>
          <Search />
        </div>
      </div>
      <form
        ref={formRef}
        action={action}
        autoComplete="off"
      >
        <Input
          name="query"
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
