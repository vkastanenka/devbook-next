// components
import { LoginCard } from '@/components/cards/login-card'

// svg
import { DevbookLogoText } from '../components/svg/devbook-logo'

const HomePage = () => {
  return (
    <div className="flex justify-center gutter h-full">
      <div className="w-full xl:w-[1140px] flex flex-col xl:flex-row justify-center items-center gap-8 xl:[&>*]:basis-full">
        <div className="w-[208px] xl:w-auto">
          <DevbookLogoText />
        </div>
        <div className="w-full xs:w-auto xl:flex xl:justify-end">
          <LoginCard />
        </div>
      </div>
    </div>
  )
}

export default HomePage
