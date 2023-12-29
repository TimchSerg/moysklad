import { BadRequestException } from '@nestjs/common'
import { UUID } from "src/utils/uuid"

export class Id {

  static from(value: string): Id {
    try {
      return new Id(UUID.from(value))
    } catch {
      throw new BadRequestException('Неверный формат UUID', { cause: new Error(), description: 'Неверный формат UUID' })
    }
  }

  private _value: UUID

  constructor(value: UUID) {
    this._value = value
  }

  get value(): UUID {
    return this._value
  }

  equals(id: Id): boolean {
    return this._value.equals(id._value)
  }

  toString(): string {
    return this._value.toString()
  }
}
