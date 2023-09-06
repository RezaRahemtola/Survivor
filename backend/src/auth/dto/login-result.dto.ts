import { IsJWT } from 'class-validator';

export class MasuraoLoginResultDto {
  @IsJWT()
  access_token!: string;
}
