// svg
import AuthLayout from '@/src/app/(public)/(auth)/layout'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthLayout>{children}</AuthLayout>
}
