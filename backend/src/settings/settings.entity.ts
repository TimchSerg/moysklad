import { Id } from "src/values/id.values"

export class Settings {

  private _id: Id
  private _accountId: string
  private _organizationId: string
  private _cashboxId: string
  private _snoId: string
  private _email: string
  private _paymentSystemId: string
  private _createdAt: Date

  constructor(
    id: Id,
    accountId: string,
    organizationId: string,
    cashboxId: string,
    snoId: string,
    email: string,
    paymentSystemId: string,
    createdAt: Date
  ) {
    this._id = id
    this._accountId = accountId
    this._organizationId = organizationId
    this._cashboxId = cashboxId
    this._snoId = snoId
    this._email = email
    this._paymentSystemId = paymentSystemId
    this._createdAt = createdAt
  }

  get id(): Id {
    return this._id
  }

  get accountId(): string {
    return this._accountId
  }

  get organizationId(): string {
    return this._organizationId
  }

  set organizationId(organizationId: string) {
    this._organizationId = organizationId
  }

  get cashboxId(): string {
    return this._cashboxId
  }

  set cashboxId(cashboxId: string) {
    this._cashboxId = cashboxId
  }

  get snoId(): string {
    return this._snoId
  }

  set snoId(snoId: string) {
    this._snoId = snoId
  }

  get email(): string {
    return this._email
  }

  set email(email: string) {
    this._email = email
  }

  get paymentSystemId(): string {
    return this._paymentSystemId
  }

  set paymentSystemId(paymentSystemId: string) {
    this._paymentSystemId = paymentSystemId
  }

  get createdAt(): Date {
    return this._createdAt
  }

  equals(settings: Settings): boolean {
    return this.id.equals(settings.id)
  }
}
