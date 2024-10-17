import DevbookLogo from '/public/svg/devbook-logo-text-light.svg'
import { LogoutButton } from '@/components/buttons/logout-button'

export const PrivateNav: React.FC = () => {
  return (
    <header className="z-50 h-nav w-full fixed top-0 bg-foreground flex justify-center items-center gutter py-2">
      <nav className="container flex items-center justify-between">
        <DevbookLogo className="max-w-[120px]" />
        <LogoutButton />
      </nav>
    </header>
  )
}
