"use client"

import { useState, useRef, useEffect } from "react"
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
import { X, ChevronDown } from "lucide-react"

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
  const [expanded, setExpanded] = useState(false)
  const [showExpandButton, setShowExpandButton] = useState(false)
  const bioRef = useRef<HTMLDivElement>(null)
  
  // Check if bio content is overflowing
  useEffect(() => {
    if (bioRef.current && isOpen) {
      const isOverflowing = bioRef.current.scrollHeight > bioRef.current.clientHeight
      setShowExpandButton(isOverflowing)
    }
  }, [isOpen, member])
  
  // Reset expanded state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setExpanded(false)
    }
  }, [isOpen])
  
  if (!member) return null
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-xl font-bold">{member.name}</DialogTitle>
          <DialogDescription className="text-[#D4AF37]">
            {member.position}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start mt-4 overflow-hidden">
          <div className="relative h-32 w-32 rounded-full overflow-hidden flex-shrink-0 sm:mt-0 mt-0 mx-auto sm:mx-0">
            <Image
              src={member.imageSrc}
              alt={member.name}
              fill
              className="object-cover object-center"
              style={{ 
                objectPosition: member.id <= 3 
                  ? '50% 10%' 
                  : '50% 25%' 
              }}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div 
              ref={bioRef}
              className={`text-foreground/80 text-sm overflow-y-auto pr-2 ${
                expanded ? "max-h-[calc(60vh-160px)]" : "max-h-[180px]"
              } transition-all duration-300`}
            >
              {member.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {showExpandButton && (
              <div className="flex justify-center mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs gap-1 hover:bg-background/5"
                >
                  {expanded ? "Show less" : "Read more"} 
                  <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end mt-4 pt-2 border-t border-border">
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