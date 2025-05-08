"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "./button"
import { Card } from "./card"
import { Input } from "./input"
import { MessageCircle, SendHorizontal, X, RotateCcw } from "lucide-react"
import { Avatar } from "./avatar"
import { ScrollArea } from "./scroll-area"
import { useGlobalChat } from "@/context/chat-context"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import ReactMarkdown from "react-markdown"

export function ChatWidget() {
  const [inputMessage, setInputMessage] = useState("")
  const messageEndRef = useRef<HTMLDivElement>(null)
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    isOpen, 
    openChat, 
    closeChat,
    sessionId,
    resetSession
  } = useGlobalChat()

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const messageToSend = inputMessage
    setInputMessage("")
    await sendMessage(messageToSend)
  }

  const handleResetSession = () => {
    resetSession()
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[450px] shadow-lg flex flex-col">
          <div className="flex items-center justify-between bg-primary text-primary-foreground p-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-medium">Chat Support</h3>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground"
                    onClick={handleResetSession}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset conversation</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground"
                onClick={closeChat}
              >
                <X size={18} />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-3">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-xs">AI</div>
                        </Avatar>
                        <span className="text-xs font-medium">Assistant</span>
                      </div>
                    )}
                    {msg.sender === "bot" ? (
                      <div className="text-sm markdown-content">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                    <p className="text-xs opacity-70 text-right mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t">
            <div className="mb-2">
              <p className="text-xs text-muted-foreground">Session ID: {sessionId.substring(0, 15)}...</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                size="icon"
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
              >
                <SendHorizontal size={18} />
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={openChat}
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  )
} 