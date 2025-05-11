# Chat Widget Implementation Guide

## Overview

This document provides a comprehensive technical guide to our chat widget implementation. The chat widget enables real-time customer support through an interactive floating interface that connects to an n8n webhook for processing messages and responses.

## Table of Contents

1. [Architecture](#architecture)
2. [Component Breakdown](#component-breakdown)
3. [Data Flow](#data-flow)
4. [Session Management](#session-management)
5. [Webhook Integration](#webhook-integration)
6. [State Management](#state-management)
7. [Styling and Animations](#styling-and-animations)
8. [Responsive Design](#responsive-design)
9. [Markdown Support](#markdown-support)
10. [Error Handling](#error-handling)
11. [Performance Considerations](#performance-considerations)
12. [Integration Examples](#integration-examples)
13. [Testing](#testing)
14. [Extending the Widget](#extending-the-widget)

## Architecture

The chat widget follows a clean, modular architecture with clear separation of concerns:

```
├── components/
│   └── ui/
│       └── chat-widget.tsx    # Main UI component
├── hooks/
│   └── use-chat.ts            # Custom hook for chat state and logic
├── context/
│   └── chat-context.tsx       # Global context provider
├── lib/
│   └── chat.ts                # Utility functions and types
└── app/
    └── globals.css            # Chat widget styling
```

This structure ensures:

- UI logic remains separate from business logic
- State is managed efficiently and globally when needed
- Utilities and types are reusable across the application
- Styling is centralized for consistency

## Component Breakdown

### 1. UI Component (`components/ui/chat-widget.tsx`)

The main UI component handles:

- Rendering the floating chat button
- Expanding/collapsing the chat dialog
- Rendering message history
- Input field for user messages
- Sending messages and handling form submission
- Displaying loading states
- Session management UI

```tsx
// Key component structure (simplified)
export function ChatWidget() {
  // Local state for input field
  const [inputMessage, setInputMessage] = useState("");

  // Get chat functionality from context
  const {
    messages,
    isLoading,
    sendMessage,
    isOpen,
    openChat,
    closeChat,
    sessionId,
    resetSession,
  } = useGlobalChat();

  // Message sending handler
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageToSend = inputMessage;
    setInputMessage("");
    await sendMessage(messageToSend);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {isOpen ? (
        <Card className="...">
          {/* Header with title and close button */}
          {/* Message display area */}
          {/* Input form */}
        </Card>
      ) : (
        <Button onClick={openChat}>
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
}
```

### 2. Custom Hook (`hooks/use-chat.ts`)

The custom hook `useChat` encapsulates all chat logic:

- Message state management
- API communication
- Loading states
- Error handling
- Session management

```typescript
export function useChat({
  webhookUrl,
  initialMessages = [
    createMessage("Hi there! How can I help you today?", "bot"),
  ],
}: UseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize session ID
  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  // Send message to webhook
  const sendMessage = useCallback(
    async (messageText: string) => {
      // Implementation details...
    },
    [webhookUrl, sessionId]
  );

  // Other utility functions
  const clearMessages = useCallback(() => {
    // Implementation details...
  }, []);

  const resetSession = useCallback(() => {
    // Implementation details...
  }, [clearMessages]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    sessionId,
    resetSession,
  };
}
```

### 3. Context Provider (`context/chat-context.tsx`)

The context provider makes chat functionality available globally:

```typescript
export function ChatProvider({
  children,
  webhookUrl = "https://n8n.baivab.space/webhook/b36d64de-14af-4047-b2bb-bcf4e79c246a/chat",
}: {
  children: React.ReactNode;
  webhookUrl?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Use the custom hook
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    sessionId,
    resetSession,
  } = useChat({ webhookUrl });

  // UI state functions
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  // Provide values to context
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
  );
}

// Hook for consuming the context
export function useGlobalChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useGlobalChat must be used within a ChatProvider");
  }
  return context;
}
```

### 4. Utilities (`lib/chat.ts`)

The utilities file provides:

- TypeScript interfaces
- Message creation helper
- Session ID management
- Webhook communication

```typescript
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Session ID management
export function getOrCreateSessionId(): string {
  // Implementation details...
}

// Webhook communication
export async function sendMessageToWebhook(
  webhookUrl: string,
  message: string,
  sessionId?: string
): Promise<{ output: string }> {
  // Implementation details...
}

// Message creation helper
export function createMessage(
  content: string,
  sender: "user" | "bot"
): ChatMessage {
  // Implementation details...
}
```

## Data Flow

The chat widget's data flow follows this pattern:

1. **User interaction**:

   - User types a message and submits the form in `chat-widget.tsx`
   - Local component calls `handleSendMessage()`

2. **Message processing**:

   - `handleSendMessage()` clears input and calls `sendMessage()` from context
   - Context's `sendMessage()` calls the same function from `use-chat.ts`
   - The hook creates a user message and adds it to state
   - Sets `isLoading` to true

3. **API communication**:

   - Hook calls `sendMessageToWebhook()` from `lib/chat.ts`
   - Utility sends a POST request with message and session ID
   - Webhook processes the message and returns a response

4. **Response handling**:

   - Hook receives response, creates a bot message, and adds it to state
   - Sets `isLoading` to false
   - UI updates to show the new message

5. **Error handling**:
   - If API call fails, an error message is added to the chat
   - Loading state is reset

## Session Management

The chat widget implements conversation session tracking:

1. **Session ID generation**:

   - First visit: Generate a unique ID with timestamp and random string
   - Format: `session_[timestamp]_[random]`
   - Store in `localStorage`

2. **Session persistence**:

   - On component mount, retrieve existing session ID from localStorage
   - All messages include the current session ID

3. **Session reset**:
   - User can reset their session via the UI
   - Removes session ID from localStorage
   - Generates a new session ID
   - Clears message history

Implementation details in `lib/chat.ts`:

```typescript
export function getOrCreateSessionId(): string {
  // Check for existing session ID
  const existingSessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("chat_session_id")
      : null;

  if (existingSessionId) {
    return existingSessionId;
  }

  // Create new session ID
  const newSessionId = `session_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  // Store in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("chat_session_id", newSessionId);
  }

  return newSessionId;
}
```

## Webhook Integration

The chat widget connects to an n8n webhook for message processing:

1. **Configuration**:

   - Default webhook URL: `https://n8n.baivab.space/webhook/b36d64de-14af-4047-b2bb-bcf4e79c246a/chat`
   - Configurable via `ChatProvider` props

2. **Request format**:

   ```json
   {
     "message": "User's message text",
     "sessionId": "session_1234567890_abcdef"
   }
   ```

3. **Expected response format**:

   ```json
   {
     "output": "Assistant's response with markdown support"
   }
   ```

4. **Implementation**:

   ```typescript
   export async function sendMessageToWebhook(
     webhookUrl: string,
     message: string,
     sessionId?: string
   ): Promise<{ output: string }> {
     // Use provided sessionId or get/create one
     const chatSessionId = sessionId || getOrCreateSessionId();

     try {
       const response = await fetch(webhookUrl, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           message: message.trim(),
           sessionId: chatSessionId,
         }),
       });

       if (!response.ok) {
         throw new Error(`Failed to send message: ${response.statusText}`);
       }

       return await response.json();
     } catch (error) {
       console.error("Error sending message to webhook:", error);
       throw error;
     }
   }
   ```

## State Management

The chat widget uses React's built-in state management with strategic use of:

1. **useState**: For local component state

   - Input field value
   - Message list
   - Loading state
   - Chat open/closed state

2. **useCallback**: For memoized functions

   - `sendMessage()`
   - `clearMessages()`
   - `resetSession()`

3. **useContext**: For global state access

   - Makes chat functionality available throughout the app
   - Prevents prop drilling

4. **useRef + useEffect**: For auto-scrolling
   - Keeps the chat scrolled to the latest message
   - Scrolls smoothly when new messages arrive

## Styling and Animations

The chat widget includes custom styling and animations:

1. **CSS animations** in `globals.css`:

   - Floating button hover effects
   - Chat dialog slide-up animation
   - Typing indicator animation

2. **Tailwind CSS** for component styling:

   - Responsive layout
   - Dark/light mode compatibility
   - UI component consistency

3. **Animation keyframes**:

   ```css
   @keyframes slideUp {
     from {
       opacity: 0;
       transform: translateY(20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }

   @keyframes typingDots {
     0%,
     100% {
       opacity: 0.2;
     }
     50% {
       opacity: 1;
     }
   }
   ```

## Responsive Design

The chat widget is fully responsive:

1. **Mobile optimization**:

   - Floating button stays accessible
   - Chat dialog adapts to screen width
   - Input controls remain usable on small screens

2. **Width adjustments**:

   ```tsx
   <Card className="w-80 sm:w-96 h-[450px] shadow-xl flex flex-col">
   ```

3. **Multi-device testing**:
   - Verified on desktop, tablet, and mobile
   - Works across different browsers

## Markdown Support

The chat widget supports Markdown formatting in bot responses:

1. **Implementation**:

   ```tsx
   import ReactMarkdown from "react-markdown";

   // In the component:
   {
     msg.sender === "bot" ? (
       <div className="text-sm markdown-content">
         <ReactMarkdown>{msg.content}</ReactMarkdown>
       </div>
     ) : (
       <p className="text-sm">{msg.content}</p>
     );
   }
   ```

2. **Supported Markdown**:

   - Headings
   - Lists (ordered and unordered)
   - Links
   - Bold and italic text
   - Code blocks and inline code
   - Blockquotes
   - Horizontal rules

3. **Custom styling** for Markdown elements in `globals.css`:

   ```css
   .markdown-content code {
     font-family: monospace;
     background-color: rgba(0, 0, 0, 0.05);
     padding: 0.1rem 0.3rem;
     border-radius: 3px;
     font-size: 0.9em;
   }

   .markdown-content blockquote {
     border-left: 3px solid hsl(var(--muted-foreground));
     padding-left: 0.75rem;
     color: hsl(var(--muted-foreground));
     font-style: italic;
     margin: 0.5rem 0;
   }

   /* Additional styles... */
   ```

## Error Handling

The chat widget implements comprehensive error handling:

1. **Network errors**:

   - Catches fetch failures
   - Displays user-friendly error messages
   - Logs detailed errors to console

2. **Response validation**:

   - Checks for valid response structure
   - Falls back to default message if response is malformed

3. **Implementation**:
   ```typescript
   try {
     // API call logic...
   } catch (error) {
     console.error("Error sending message:", error);

     // Add error message to chat
     const errorMessage = createMessage(
       "Sorry, there was an error processing your message. Please try again.",
       "bot"
     );

     setMessages((prev) => [...prev, errorMessage]);
     return false;
   } finally {
     setIsLoading(false);
   }
   ```

## Performance Considerations

The chat widget is optimized for performance:

1. **Memoization**:

   - Key functions wrapped in `useCallback`
   - Prevents unnecessary re-renders

2. **Efficient state updates**:

   - Functional state updates (`setMessages(prev => ...)`)
   - Only updates what changes

3. **Scroll optimization**:

   - Uses `useRef` for direct DOM manipulation
   - Smooth scrolling with minimal re-renders

4. **Lazy loading**:
   - Widget UI component could be lazy-loaded if needed

## Integration Examples

### Basic Integration

To add the chat widget to your application:

1. Wrap your app with the `ChatProvider`:

   ```tsx
   // In your app layout or provider component
   import { ChatProvider } from "@/context/chat-context";
   import { ChatWidget } from "@/components/ui/chat-widget";

   export default function Layout({ children }) {
     return (
       <ChatProvider webhookUrl="https://your-webhook-url.com">
         {children}
         <ChatWidget />
       </ChatProvider>
     );
   }
   ```

2. Programmatic access from any component:

   ```tsx
   import { useGlobalChat } from "@/context/chat-context";

   export function ProductDetail() {
     const { openChat, sendMessage } = useGlobalChat();

     const handleSupportClick = () => {
       openChat();
       sendMessage(`I have a question about product ID: ${productId}`);
     };

     return (
       <div>
         <h1>Product Name</h1>
         <Button onClick={handleSupportClick}>
           Get Support for This Product
         </Button>
       </div>
     );
   }
   ```

### Advanced Integration

For more complex scenarios:

1. Custom webhook configuration:

   ```tsx
   <ChatProvider webhookUrl={process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL}>
     {children}
   </ChatProvider>
   ```

2. Conditional widget visibility:

   ```tsx
   {
     isLoggedIn && <ChatWidget />;
   }
   ```

3. Integration with analytics:
   ```tsx
   const sendMessage = useCallback(
     async (messageText) => {
       // Existing sendMessage logic...

       // Analytics tracking
       trackEvent("chat_message_sent", {
         messageLength: messageText.length,
         sessionId,
       });
     },
     [
       /* dependencies */
     ]
   );
   ```

## Testing

The chat widget can be tested at several levels:

1. **Unit testing**:

   - Test utility functions in isolation
   - Mock webhook responses
   - Verify state management logic

2. **Component testing**:

   - Test UI rendering and interactions
   - Verify loading states and animations
   - Test error state display

3. **Integration testing**:

   - Test end-to-end message flow
   - Verify session management
   - Test webhook integration with mocks

4. **Sample test case**:
   ```tsx
   test("sends user message and displays response", async () => {
     // Setup mocks for fetch
     global.fetch = jest.fn(() =>
       Promise.resolve({
         ok: true,
         json: () => Promise.resolve({ output: "Mock response" }),
       })
     );

     // Render component
     render(
       <ChatProvider>
         <ChatWidget />
       </ChatProvider>
     );

     // Find input and submit button
     const input = screen.getByPlaceholderText("Type your message...");
     const submitButton = screen.getByRole("button", { type: "submit" });

     // Type and submit a message
     fireEvent.change(input, { target: { value: "Hello" } });
     fireEvent.click(submitButton);

     // Verify user message appears
     expect(await screen.findByText("Hello")).toBeInTheDocument();

     // Verify bot response appears after API call
     expect(await screen.findByText("Mock response")).toBeInTheDocument();

     // Verify fetch was called with correct parameters
     expect(fetch).toHaveBeenCalledWith(
       expect.any(String),
       expect.objectContaining({
         method: "POST",
         body: expect.stringContaining("Hello"),
       })
     );
   });
   ```

## Extending the Widget

The chat widget can be extended in several ways:

1. **Additional features**:

   - File/image attachments
   - Audio messages
   - Quick reply buttons
   - Typing indicators for user awareness
   - Chat transcript export

2. **UI customizations**:

   - Theme integration
   - Custom avatars
   - Branded styling
   - Alternative layouts

3. **Backend integrations**:

   - Different webhook providers
   - Direct API integration
   - WebSocket for real-time communication

4. **User authentication**:
   - Linking chat sessions to user accounts
   - Preserving chat history across devices
   - User identification for the support team

Example extension for file uploads:

```typescript
// 1. Add to ChatMessage interface
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: {
    url: string;
    type: "image" | "file";
    name: string;
    size: number;
  }[];
}

// 2. Add file upload handling to useChat
const uploadFile = useCallback(async (file: File) => {
  // File upload logic...
  // Return attachment metadata
}, []);

// 3. Add to UI component
function AttachmentButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
      >
        <Paperclip size={18} />
      </Button>
    </>
  );
}
```

---

This documentation provides a comprehensive overview of the chat widget implementation. Developers can use this as a reference for understanding, maintaining, and extending the widget functionality.
