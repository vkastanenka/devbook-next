// components
import { LoginModal } from '@/components/modals/login-modal'

// svg
import DevbookLogo from '/public/svg/devbook-logo-text-dark.svg'

const HomePage = () => {
  return (
    <div className="flex justify-center gutter h-full">
      <div className="w-[980px] flex items-center gap-8">
        <div className="basis-full">
          <DevbookLogo className="w-full" />
        </div>
        <div className="basis-full flex justify-end">
          <LoginModal />
        </div>
      </div>
    </div>
  )
}

export default HomePage
