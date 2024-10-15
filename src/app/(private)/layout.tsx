// components
import { PrivateNav } from '@/components/navigation/private-nav'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <PrivateNav />
      <div className="mt-nav flex justify-center gutter">
        <div className="container py-8">{children}</div>
      </div>
    </>
  )
}
