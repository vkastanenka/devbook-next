// components
import { Card as CardShadCn } from '@/components/ui/card'

interface Card {
  children: React.ReactNode
}

export const Card: React.FC<Card> = ({ children }) => {
  return <CardShadCn className='card'>{children}</CardShadCn>
}
