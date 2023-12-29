import { IsString } from "class-validator"

export class CreateSettingDto {
  @IsString()
  accountId!: string

  @IsString()
  organizationId!: string

  @IsString()
  cashboxId!: string

  @IsString()
  snoId!: string

  @IsString()
  email!: string

  @IsString()
  paymentSystemId!: string
}
