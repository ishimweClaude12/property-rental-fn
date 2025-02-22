import { TestBed } from '@angular/core/testing';

import { MessageConversationService } from './message-conversation.service';

describe('MessageConversationService', () => {
  let service: MessageConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
