import { Injectable } from '@nestjs/common';
import ChatMessage from './entities/chat-message.entity';
import PaginationDto from '../pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async getMessages(pagination: PaginationDto): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.find({
      ...pagination,
      where: {
        receiver: null,
      },
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getDirectMessagesFromEmail(
    userEmail: string,
    otherUserEmail: string,
    pagination: PaginationDto,
  ): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.find({
      ...pagination,
      where: [
        { sender: userEmail, receiver: otherUserEmail },
        { sender: otherUserEmail, receiver: userEmail },
      ],
      order: {
        createdAt: 'desc',
      },
    });
  }

  async saveMessage(
    content: string,
    sender: string,
    receiver?: string,
  ): Promise<ChatMessage> {
    return await this.chatMessageRepository.save({ content, sender, receiver });
  }
}
