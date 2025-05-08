"use client"

import React, { createContext, useContext, useState } from "react"
import { useChat } from "@/hooks/use-chat"
import { ChatMessage } from "@/lib/chat"

interface ChatContextType {
  messages: ChatMessage[]
  isLoading: boolean
  sendMessage: (message: string) => Promise<boolean | undefined>
  clearMessages: () => void
  sessionId: string
  resetSession: () => string
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ 
  children,
  webhookUrl = "https://n8n.baivab.space/webhook/b36d64de-14af-4047-b2bb-bcf4e79c246a/chat" 
}: { 
  children: React.ReactNode
  webhookUrl?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearMessages,
    sessionId,
    resetSession
  } = useChat({
    webhookUrl,
  })

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen((prev) => !prev)

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearMessages,
        sessionId,
        resetSession,
        isOpen,
        openChat,
        closeChat,
        toggleChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useGlobalChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useGlobalChat must be used within a ChatProvider")
  }
  return context
} 