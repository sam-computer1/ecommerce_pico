# Chat Widget Implementation

This document describes the implementation of the chat widget in our e-commerce application. The chat widget connects to an n8n webhook for processing customer messages.

## Architecture

The chat widget is built with a clean, modular architecture:

1. **UI Component**: The widget's user interface (`components/ui/chat-widget.tsx`)
2. **Custom Hook**: State management and API interactions (`hooks/use-chat.ts`)
3. **Context Provider**: Global state for chat across components (`context/chat-context.tsx`)
4. **Utilities**: Helper functions for chat operations (`lib/chat.ts`)

## Key Components

### 1. Chat Widget UI (`components/ui/chat-widget.tsx`)

The UI component responsible for rendering the chat interface:

- Floating chat button in the bottom right corner
- Expandable chat dialog
- Message history display
- Input field for typing messages
- Session ID display and reset button

### 2. Chat Hook (`hooks/use-chat.ts`)

Custom React hook that manages:

- Message state
- Loading states
- Sending/receiving messages
- Error handling
- Session management

### 3. Chat Context (`context/chat-context.tsx`)

Context provider that makes chat functionality available globally:

- Chat state (messages, loading state)
- Chat visibility controls (open, close, toggle)
- Message functions (send, clear)
- Session management (sessionId, resetSession)

### 4. Chat Utilities (`lib/chat.ts`)

Helper functions and types:

- Message data structure
- API communication functions
- Message creation utilities
- Session ID generation and management

## Session Management

The chat widget implements session tracking to maintain conversation context across messages:

- A unique session ID is generated for each user/browser session
- The session ID is stored in localStorage for persistence across page reloads
- The session ID is included with each message sent to the webhook
- A reset button allows users to start a new conversation session

## Webhook Integration

The chat widget integrates with an n8n webhook:

```typescript
const webhookUrl =
  "https://n8n.baivab.space/webhook/b36d64de-14af-4047-b2bb-bcf4e79c246a/chat";
```

Messages are sent as POST requests with this structure:

```json
{
  "message": "The user's message text",
  "sessionId": "session_1234567890_abcdef"
}
```

The webhook should respond with:

```json
{
  "output": "The assistant's response message, which may include markdown formatting"
}
```

## Usage

### Within Components

To use the chat functionality in any component:

```tsx
import { useGlobalChat } from "@/context/chat-context";

function YourComponent() {
  const { openChat, sendMessage, sessionId, resetSession } = useGlobalChat();

  return (
    <div>
      <p>Current session: {sessionId}</p>
      <button
        onClick={() => {
          openChat();
          sendMessage("I need help with my order");
        }}
      >
        Get Help
      </button>
      <button onClick={resetSession}>Start New Conversation</button>
    </div>
  );
}
```

### Updating the Webhook

To change the webhook URL, modify:

1. The default URL in `context/chat-context.tsx`
2. Or provide a different URL when using `ChatProvider`:

```tsx
<ChatProvider webhookUrl="https://your-new-webhook-url.com">
  {children}
</ChatProvider>
```

## Style Customization

The chat widget uses the application's theme system. To customize:

- Modify classes in `components/ui/chat-widget.tsx`
- The widget adapts to light/dark mode automatically

## Error Handling

The chat widget implements error handling:

- Network errors when contacting the webhook
- Fallback messages if the webhook doesn't respond properly
- Proper loading states during communication
