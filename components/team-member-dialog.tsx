"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"

export interface TeamMemberProps {
  id: number
  name: string
  position: string
  bio: string
  imageSrc: string
}

interface TeamMemberDialogProps {
  member: TeamMemberProps | null
  isOpen: boolean
  onClose: () => void
}

export default function TeamMemberDialog({ member, isOpen, onClose }: TeamMemberDialogProps) {
  if (!member) return null
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-xl font-bold">{member.name}</DialogTitle>
          <DialogDescription className="text-[#D4AF37] dark:text-[#C77C48]">
            {member.position}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center mt-4">
          <div className="relative h-32 w-32 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={member.imageSrc}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1">
            <p className="text-[#4A3C31] dark:text-[#C0C0C0] text-sm">
              {member.bio}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="gap-2">
              <X className="h-4 w-4" /> Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
} 