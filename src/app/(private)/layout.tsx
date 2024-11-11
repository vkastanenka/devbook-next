//components
import { Navbar } from '@/src/components/ui/navbar'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="mt-nav flex justify-center gutter">
        <div className="container py-8">{children}</div>
      </div>
    </>
  )
}
