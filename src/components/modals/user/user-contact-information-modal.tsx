"use client";

// components
import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/src/components/ui/dialog";

// utils
import { useModal } from "@/src/hooks/use-modal-store";

export const UserContactInformationModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal();
  const isModalOpen = isOpen && type === "userContactInformation";
  if (!user) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogTitle>
        <p className="h3">Contact Info</p>
      </DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent className="bg-card flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <p className="h3">Page Url</p>
          </div>
          <Link
            className="button-text"
            href={`${process.env.NEXT_ROOT_URL}/user/${user.username}`}
          >
            {`${process.env.NEXT_ROOT_URL}/user/${user.username}`}
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="h3">Email</p>
          </div>
          <Link className="button-text" href={`mailto:${user.email}`}>
            {user.email}
          </Link>
        </div>
        {user.phone && (
          <div className="flex flex-col gap-2">
            <div>
              <p className="h3">Phone Number</p>
            </div>
            <p className="p">{user.phone}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
