import { DevbookLogoText } from '@/components/svg/devbook-logo'
import { LogoutButton } from '@/components/buttons/logout-button'

export const PrivateNav: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-card border-b-[1px] flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between">
        <DevbookLogoText className="max-w-[120px]" />
        <LogoutButton />
      </nav>
    </header>
  )
}
