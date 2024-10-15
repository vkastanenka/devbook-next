import DevbookLogo from '/public/svg/devbook-logo-text-light.svg'

export const PrivateNav: React.FC = () => {
  return (
    <header className="h-nav w-full fixed top-0 bg-foreground flex justify-center items-center gutter py-2">
      <nav className="container">
        <DevbookLogo className="max-w-[120px]" />
      </nav>
    </header>
  )
}
