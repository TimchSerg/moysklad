import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey
} from "sequelize-typescript"

@Table({ tableName: 'settings' })
export class SettingsModel extends Model<SettingsModel> {

  @PrimaryKey
  @Column(DataType.UUID)
  id!: string

  @Column(DataType.TEXT)
  accountId!: string

  @Column(DataType.TEXT)
  organizationId!: string

  @Column(DataType.TEXT)
  cashboxId!: string

  @Column(DataType.TEXT)
  snoId!: string

  @Column(DataType.TEXT)
  paymentSystemId!: string

  @Column(DataType.TEXT)
  email!: string

  @Column(DataType.DATE)
  updatedAt!: Date

  @Column(DataType.DATE)
  createdAt!: Date

  @Column(DataType.DATE)
  deletedAt!: Date
}