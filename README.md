# E-commerce PICo Application

This is an e-commerce application built with Next.js. It includes product listings, shopping cart functionality, and a live chat widget.

## Features

- Product listings with filtering and search
- Shopping cart and wishlist functionality
- User authentication
- Responsive design
- **Live Chat Widget** with n8n webhook integration

## Chat Widget Implementation

The application includes a real-time chat widget that connects to an n8n webhook for handling messages. The chat widget allows customers to get immediate assistance while shopping.

### Chat Widget Architecture

- **UI Component**: Located at `components/ui/chat-widget.tsx`
- **Helper Functions**: Located at `lib/chat.ts`
- **Custom Hook**: Located at `hooks/use-chat.ts`
- **Context Provider**: Located at `context/chat-context.tsx`
- **Webhook Integration**: Messages are sent to an n8n webhook endpoint for processing

### Documentation

For detailed documentation on the chat widget implementation, please see [Chat Widget Documentation](docs/CHAT_WIDGET.md).

### How It Works

1. The chat widget appears as a floating button in the bottom-right corner of all pages
2. When opened, it displays a chat interface with message history
3. User messages are sent to the n8n webhook URL for processing
4. Responses from the webhook are displayed in the chat interface
5. Session tracking allows for maintaining context across messages

### Session Management

The chat widget implements session tracking to maintain conversation context:

- Each user gets a unique session ID stored in their browser
- All messages sent to the webhook include this session ID
- The n8n workflow can use this session ID to maintain conversation context
- Users can reset their session to start a fresh conversation

### Configuration

The chat widget is configured to use the following webhook URL:

```
https://n8n.baivab.space/webhook/b36d64de-14af-4047-b2bb-bcf4e79c246a/chat
```

To change the webhook URL, modify the `webhookUrl` variable in `context/chat-context.tsx`.

### Webhook Payload Format

Messages are sent to the webhook with this structure:

```json
{
  "message": "The user's question or message",
  "sessionId": "session_1234567890_abcdef"
}
```

The webhook should respond with:

```json
{
  "output": "The assistant's response message, which may include markdown formatting"
}
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technology Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Context

## Deployment

This application can be deployed to Vercel or any other hosting platform that supports Next.js applications.

```bash
npm run build
npm run start
```

## License

MIT
