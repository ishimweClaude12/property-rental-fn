import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  ConversationResponse,
  MessageResponse,
} from '../../models/conversation-response.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageConversationService {
  http = inject(HttpClient);
  env = environment;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.env.apiToken}`,
  });
  token = localStorage.getItem('token');

  constructor() {}

  postConversation = async (
    propertyId: string
  ): Promise<ConversationResponse> => {
    // if (!this.token) {
    //   throw new Error('No token found');
    // }
    const headers = {
      Authorization: `Bearer ${this.env.apiToken}`,
    };

    const conversation$ = this.http.post<ConversationResponse>(
      `${this.env.apiRoot}/conversation`,
      {
        property_id: propertyId,
      },
      { headers }
    );

    return firstValueFrom(conversation$);
  };

  postMessage = async (
    conversationId: string,
    content: string
  ): Promise<MessageResponse> => {
    const headers = {
      Authorization: `Bearer ${this.env.apiToken}`,
    };
    const message$ = this.http.post<MessageResponse>(
      `${this.env.apiRoot}/message`,
      {
        conversation_id: conversationId,
        content: content,
      },
      { headers }
    );
    return firstValueFrom(message$);
  };
}
