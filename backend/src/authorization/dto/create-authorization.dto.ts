import { IsString } from "class-validator"

export class CreateAuthorizationDto {
  @IsString()
  login!: string

  @IsString()
  password!: string
}
