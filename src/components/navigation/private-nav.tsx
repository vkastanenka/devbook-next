// components
import { DevbookLogo } from '@/components/svg/devbook-logo'
import { LogoutButton } from '@/components/buttons/logout-button'
import { UserSearch } from '@/components/modules/user-search'

export const PrivateNav: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-card border-b-[1px] flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <DevbookLogo className="w-[40px]" />
          <UserSearch />
        </div>
        <LogoutButton />
      </nav>
    </header>
  )
}
