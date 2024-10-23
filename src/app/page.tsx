// components
import { LoginCard } from '@/components/cards/login-card'

// svg
import { DevbookLogoText } from '@/components/svg/devbook-logo'

const HomePage = () => {
  return (
    <div className="flex justify-center items-center gutter h-full">
      <div className="w-full xs:w-auto xl:w-[1140px] flex flex-col xl:flex-row gap-8 justify-center items-center xl:[&>*]:basis-full">
        <div className="w-[250px] xl:w-auto">
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
