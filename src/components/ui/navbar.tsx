// components
import Link from 'next/link'
import { DevbookLogo } from '@/src/components/svg/devbook-logo'
import { AuthLogoutButton } from '@/src/components/buttons/auth/auth-logout-button'

// forms
import { SearchForm } from '@/src/components/forms/search/search-form'

export const Navbar: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-card border-b-[1px] flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Link className='button-text' href="/feed">
            <DevbookLogo className="w-[40px]" />
          </Link>
          <SearchForm />
        </div>
        <AuthLogoutButton />
      </nav>
    </header>
  )
}
