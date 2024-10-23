// components
import Link from 'next/link'
import { DevbookLogo } from '@/components/svg/devbook-logo'
import { LogoutButton } from '@/components/buttons/logout-button'
import { SearchDevbookForm } from '@/components/forms/search-devbook-form'

export const PrivateNav: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-card border-b-[1px] flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Link href="/feed">
            <DevbookLogo className="w-[40px]" />
          </Link>
          <SearchDevbookForm />
        </div>
        <LogoutButton />
      </nav>
    </header>
  )
}
