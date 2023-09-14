import {
  IsArray,
  IsBase64,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class GlobalMessageSendDto {
  @IsString()
  message!: string;

  @IsOptional()
  @IsArray()
  @IsBase64({ each: true })
  pictures?: string[];
}

export class DirectMessageSendDto extends GlobalMessageSendDto {
  @IsEmail()
  receiver!: string;
}
