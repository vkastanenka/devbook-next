// components
import Link from 'next/link'
import { DevbookLogo } from '@/components/svg/devbook-logo'
import { LogoutButton } from '@/src/components/modules/buttons/logout-button'
import { SearchForm } from '@/components/forms/search/search-form'

export const PrivateNav: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-card border-b-[1px] flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Link href="/feed">
            <DevbookLogo className="w-[40px]" />
          </Link>
          <SearchForm />
        </div>
        <LogoutButton />
      </nav>
    </header>
  )
}
