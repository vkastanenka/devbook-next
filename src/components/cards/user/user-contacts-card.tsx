// components
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'

// types
import { User } from '@/src/lib/types'

interface UserContactsCard {
  userContacts?: User[] | null
}

export const UserContactsCard: React.FC<UserContactsCard> = ({
  userContacts,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <Typography.H4>Contacts</Typography.H4>
        <div>
          {userContacts?.length ? (
            <div>
              Contacts
              {/* {userContacts?.map(contact => <UserContactsCardContact />)} */}
            </div>
          ) : (
            <>
              <Typography.H3>Nothing here yet!</Typography.H3>
              <Typography.P>
                {`This user hasn't found any contacts yet.`}
              </Typography.P>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
