// components
import { Card } from '@/components/primitives/card'

// types
import { User } from '@/types/user-types'

interface UserContactsCard {
  userContacts?: User[] | null
}

export const UserContactsCard: React.FC<UserContactsCard> = ({
  userContacts,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <p className="h4">Contacts</p>
        <div>
          {userContacts?.length ? (
            <div>
              Contacts
              {/* {userContacts?.map(contact => <UserContactsCardContact />)} */}
            </div>
          ) : (
            <>
              <p className="h3">Nothing here yet!</p>
              <p className="p">{`This user hasn't found any contacts yet.`}</p>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
