import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey
} from "sequelize-typescript"

@Table({ tableName: 'tokens' })
export class TokensModel extends Model<TokensModel> {

  @PrimaryKey
  @Column(DataType.UUID)
  id!: string

  @Column(DataType.TEXT)
  accountId!: string

  @Column(DataType.TEXT)
  token!: string

  @Column(DataType.DATE)
  updatedAt!: Date

  @Column(DataType.DATE)
  createdAt!: Date

  @Column(DataType.DATE)
  deletedAt!: Date
}