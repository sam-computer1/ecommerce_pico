"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useGlobalChat } from "@/context/chat-context"
import { RotateCcw } from "lucide-react"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export default function SupportPage() {
  const [message, setMessage] = useState("")
  const { openChat, sendMessage, sessionId, resetSession } = useGlobalChat()

  const handleSendQuickMessage = async (msg: string) => {
    openChat()
    setTimeout(() => {
      sendMessage(msg)
    }, 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      handleSendQuickMessage(message)
      setMessage("")
    }
  }

  const handleResetSession = () => {
    const newSessionId = resetSession()
    openChat()
    setTimeout(() => {
      sendMessage("Hello, I'm starting a new conversation with session ID: " + newSessionId.substring(0, 10) + "...")
    }, 100)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Customer Support</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Where is my order?</h3>
              <p className="text-sm mb-3">
                Need to track your package or check your order status?
              </p>
              <Button 
                onClick={() => handleSendQuickMessage("I need help tracking my order")}
                variant="outline"
                size="sm"
              >
                Ask about this
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Returns & Exchanges</h3>
              <p className="text-sm mb-3">
                Want to return or exchange an item from your order?
              </p>
              <Button 
                onClick={() => handleSendQuickMessage("I need help with a return or exchange")}
                variant="outline"
                size="sm"
              >
                Ask about this
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Sizing Assistance</h3>
              <p className="text-sm mb-3">
                Need help finding the right size for your shoes?
              </p>
              <Button 
                onClick={() => handleSendQuickMessage("I need help with shoe sizing")}
                variant="outline"
                size="sm"
              >
                Ask about this
              </Button>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  What can we help you with?
                </label>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Start Chat
              </Button>
            </form>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Session Management</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground cursor-help">
                      ID: {sessionId.substring(0, 12)}...
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your current session ID</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Need to start a new conversation? Reset your session to clear the current chat history.
              </p>
              <Button 
                onClick={handleResetSession}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RotateCcw size={14} className="mr-2" />
                Reset Session
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-2">Or contact us directly:</h3>
              <p className="text-sm">Email: support@pico-shoes.com</p>
              <p className="text-sm">Phone: (555) 123-4567</p>
              <p className="text-sm">Hours: Mon-Fri, 9am-5pm ET</p>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">How Our Support Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">1</div>
            <h3 className="font-medium mb-2">Ask a Question</h3>
            <p className="text-sm">
              Use the chat widget or fill out the form above to ask your question.
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">2</div>
            <h3 className="font-medium mb-2">Get Immediate Help</h3>
            <p className="text-sm">
              Our support assistant will provide instant help for common issues.
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <h3 className="font-medium mb-2">Connect with an Agent</h3>
            <p className="text-sm">
              If needed, you'll be connected with a human support agent for more complex issues.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 