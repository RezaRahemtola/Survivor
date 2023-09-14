import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class ChatMessage {
  @ApiProperty({
    description: 'Id of the message',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    description: 'Sender of the message email ',
  })
  @Column({ type: 'text' })
  sender!: string;

  @ApiProperty({
    description: 'Receiver of the message email ',
  })
  @Column({ type: 'text', nullable: true })
  receiver?: string;

  @ApiProperty({
    description: 'Message content',
  })
  @Column({ type: 'text' })
  content!: string;

  @ApiProperty({
    description: 'Pictures of the message',
  })
  @Column({ type: 'text', array: true, default: [] })
  pictures: string[];

  @ApiProperty({
    description: 'Date of the creation/send of the message',
  })
  @CreateDateColumn()
  createdAt!: Date;
}
