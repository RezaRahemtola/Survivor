import { IsArray, IsBase64, IsOptional, IsString } from 'class-validator';

export default class MessageSendDto {
  @IsString()
  message!: string;

  @IsOptional()
  @IsArray()
  @IsBase64({ each: true })
  pictures?: string[];
}
