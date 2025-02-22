export interface Conversation {
  conversation_id: string;
  host_id: string;
  renter_id: string;
  property_id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  status: string;
}

export interface ConversationResponse {
  success: boolean;
  message: string;
  data: Conversation;
}

export interface Message {
  message_id: string;
  conversation_id: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  deleted_at: string | null;
  status: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: Message;
}

export interface ConversationMessageErrorResponse {
  success: false;
  message: string;
}
