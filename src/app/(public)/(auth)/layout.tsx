// svg
import { DevbookLogoText } from '@/src/components/svg/devbook-logo'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex justify-center items-center gutter h-full">
      <div className="max-w-[980px] lg:w-[980px] flex flex-col items-center gap-8">
        <DevbookLogoText className="w-[250px]" />
        {children}
      </div>
    </div>
  )
}
