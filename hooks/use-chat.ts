"use client"

import { useState, useCallback, useEffect } from "react"
import { ChatMessage, createMessage, sendMessageToWebhook, getOrCreateSessionId } from "@/lib/chat"

interface UseChatProps {
  webhookUrl: string
  initialMessages?: ChatMessage[]
}

export function useChat({ 
  webhookUrl, 
  initialMessages = [createMessage("Hi there! How can I help you today?", "bot")] 
}: UseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")

  // Initialize sessionId on client-side only
  useEffect(() => {
    setSessionId(getOrCreateSessionId())
  }, [])

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return

    // Add user message to chat
    const userMessage = createMessage(messageText, "user")
    setMessages((prev) => [...prev, userMessage])
    
    // Generate a random delay between 3-7 seconds
    const randomDelay = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000
    
    // Wait for the random delay before showing the loading indicator
    await new Promise(resolve => setTimeout(resolve, randomDelay))
    
    // Now show loading indicator
    setIsLoading(true)

    try {
      // Send message to webhook with sessionId
      const data = await sendMessageToWebhook(webhookUrl, messageText.trim(), sessionId)
      
      // Add bot response to chat
      const botMessage = createMessage(
        data.output || "Sorry, I couldn't process your request.",
        "bot"
      )
      
      setMessages((prev) => [...prev, botMessage])
      return true
    } catch (error) {
      console.error("Error sending message:", error)
      
      // Add error message
      const errorMessage = createMessage(
        "Sorry, there was an error processing your message. Please try again.",
        "bot"
      )
      
      setMessages((prev) => [...prev, errorMessage])
      return false
    } finally {
      setIsLoading(false)
    }
  }, [webhookUrl, sessionId])

  const clearMessages = useCallback(() => {
    setMessages([createMessage("Hi there! How can I help you today?", "bot")])
  }, [])

  const resetSession = useCallback(() => {
    // Clear the current session ID from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chat_session_id')
    }
    
    // Generate a new session ID
    const newSessionId = getOrCreateSessionId()
    setSessionId(newSessionId)
    
    // Reset messages
    clearMessages()
    
    return newSessionId
  }, [clearMessages])

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    sessionId,
    resetSession
  }
} 