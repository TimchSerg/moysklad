import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UUID } from 'src/utils/uuid'
import { SettingsModel } from 'src/database/models/settings.model'
import { Settings } from './settings.entity'
import { Id } from 'src/values/id.values'

function reconstitute(data: SettingsModel): Settings {
  return new Settings(
    new Id(UUID.from(data.id)),
    data.accountId,
    data.organizationId,
    data.cashboxId,
    data.snoId,
    data.email,
    data.paymentSystemId,
    data.createdAt
  )
}

@Injectable()
export class SettingsRepository {
  constructor(
    @InjectModel(SettingsModel)
    private settingsModel: typeof SettingsModel
  ) {}

  async getById(id: Id): Promise<Settings | null> {
    const model = await this.settingsModel.findOne({ 
      where: { id: id.value.toString() } 
    })
    return model == null ? null : reconstitute(model)
  }

  async getByAccountId(accountId: string): Promise<Settings | null> {
    const model = await this.settingsModel.findOne({ 
      where: { accountId: accountId } 
    })
    return model == null ? null : reconstitute(model)
  }

  async save(settings: Settings): Promise<void> {
    const [ model ] = await this.settingsModel.findOrBuild({
      where: { id: settings.id.value.toString() } 
    })

    model.set({
      id: settings.id.value.toString(),
      accountId: settings.accountId,
      organizationId: settings.organizationId,
      cashboxId: settings.cashboxId,
      snoId: settings.snoId,
      email: settings.email,
      paymentSystemId: settings.paymentSystemId,
      createdAt: settings.createdAt
    })

    await model.save()
  }

  async delete(settings: Settings): Promise<void> {
    await this.settingsModel.destroy({ 
      where: { id: settings.id.value.toString() }
    })
  }
}