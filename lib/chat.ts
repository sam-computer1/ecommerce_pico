export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

/**
 * Generates a unique session ID if one doesn't exist
 * 
 * @returns A session ID string
 */
export function getOrCreateSessionId(): string {
  // Check if we already have a session ID in localStorage
  const existingSessionId = typeof window !== 'undefined' 
    ? localStorage.getItem('chat_session_id') 
    : null;
  
  if (existingSessionId) {
    return existingSessionId;
  }
  
  // Create a new session ID
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  // Store it in localStorage for future use
  if (typeof window !== 'undefined') {
    localStorage.setItem('chat_session_id', newSessionId);
  }
  
  return newSessionId;
}

/**
 * Sends a message to the webhook and returns the response
 * 
 * @param webhookUrl - The n8n webhook URL to send the message to
 * @param message - The message text to send
 * @param sessionId - Optional session ID to track conversation (will be generated if not provided)
 * @returns The response from the webhook with an output property containing the response text
 */
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
        sessionId: chatSessionId
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

/**
 * Creates a new message object
 * 
 * @param content - The message content
 * @param sender - Who sent the message ('user' or 'bot')
 * @returns A new message object with ID and timestamp
 */
export function createMessage(
  content: string, 
  sender: "user" | "bot"
): ChatMessage {
  return {
    id: Date.now().toString(),
    content,
    sender,
    timestamp: new Date(),
  };
} 