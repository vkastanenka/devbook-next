'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { AddressForm } from '@/src/components/forms/address/address-form'
import { UserDetailsForm } from '@/src/components/forms/user/user-details-form'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserDetailsFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userDetailsForm'
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update User Details</p>
        <Tabs defaultValue="details">
          <TabsList className="w-full">
            <TabsTrigger className="basis-full" value="details">
              Details
            </TabsTrigger>
            <TabsTrigger className="basis-full" value="address">
              Address
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <UserDetailsForm user={user} />
          </TabsContent>
          <TabsContent value="address">
            <AddressForm user={user} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
