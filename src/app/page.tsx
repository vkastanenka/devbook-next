// components
import { LoginModal } from '@/components/modals/login-modal'

// svg
import { DevbookLogoText } from '../components/svg/devbook-logo'

const HomePage = () => {
  return (
    <div className="flex justify-center gutter h-full">
      <div className="w-[1140px] flex items-center gap-8">
        <div className="basis-full">
          <DevbookLogoText />
        </div>
        <div className="basis-full flex justify-end ">
          <LoginModal />
        </div>
      </div>
    </div>
  )
}

export default HomePage
