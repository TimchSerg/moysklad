import { IsString } from "class-validator"

export class TokenDto {
  @IsString()
  accountId!: string

  @IsString()
  token!: string
}
