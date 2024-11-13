// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

import Link from 'next/link'
import { DevbookLogo } from '@/src/components/svg/devbook-logo'
import { AuthLogoutButton } from '@/src/components/buttons/auth/auth-logout-button'
import { CurrentUserChangeThemeButton } from '@/src/components/buttons/user/current-user-change-theme-button'

// svg
import { Settings, Lock } from 'lucide-react'

// forms
import { SearchForm } from '@/src/components/forms/search/search-form'

export const Navbar: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-card border-b-[1px] flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Link className="button-text" href="/feed">
            <DevbookLogo className="w-[40px]" />
          </Link>
          <SearchForm />
        </div>
        <div className="flex items-center gap-2">
          <div className="pt-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="button-text p-1">
                <Settings />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>User Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CurrentUserChangeThemeButton />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Lock />
                  Update Password
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <AuthLogoutButton />
        </div>
      </nav>
    </header>
  )
}
