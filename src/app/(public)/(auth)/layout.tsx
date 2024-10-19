// svg
import DevbookLogo from '/public/svg/devbook-logo-text-dark.svg'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex justify-center items-center gutter h-full">
      <div className="w-[980px] flex flex-col items-center gap-8">
        <DevbookLogo className="w-[208px]" />
        {children}
      </div>
    </div>
  )
}
