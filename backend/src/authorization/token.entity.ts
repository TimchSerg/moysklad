import { Id } from "src/values/id.values"

export class Token {

  private _id: Id
  private _accountId: string
  private _token: string
  private _createdAt: Date

  constructor(
    id: Id,
    accountId: string,
    token: string,
    createdAt: Date
  ) {
    this._id = id
    this._accountId = accountId
    this._token = token
    this._createdAt = createdAt
  }

  get id(): Id {
    return this._id
  }

  get token(): string {
    return this._token
  }

  set token(token: string) {
    this._token = token
  }

  get accountId(): string {
    return this._accountId
  }

  get createdAt(): Date {
    return this._createdAt
  }

  equals(token: Token): boolean {
    return this.id.equals(token.id)
  }
}
