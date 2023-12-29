import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SettingsModel } from 'src/database/models/settings.model';
import { SettingsFactory } from './settings.factory';
import { SettingsRepository } from './settings.repository';
import { Id } from 'src/values/id.values';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('SettingsFactory')
    private settingsFactory: SettingsFactory,
    @Inject('SettingsRepository')
    private settingsRepository: SettingsRepository,
    @InjectModel(SettingsModel)
    private settingsModel: typeof SettingsModel,
  ) {}
  
  async create(createSettingDto: CreateSettingDto) {
    const data = await this.settingsFactory.create(
      createSettingDto.accountId,
      createSettingDto.organizationId,
      createSettingDto.cashboxId,
      createSettingDto.snoId,
      createSettingDto.email,
      createSettingDto.paymentSystemId,
    )

    await this.settingsRepository.save(data)
  }

  async findByAccountId(accountId: string): Promise<CreateSettingDto | null> {
    return await this.settingsModel.findOne({
      where: { accountId: accountId }
    }) as CreateSettingDto
  }

  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<void> {
    const required = await this.settingsRepository.getById(Id.from(id))

    if (required == null) {
      throw new BadRequestException(`Запись не была найдена по идентификатору ${id}`, { cause: new Error(), description: `Запись не была найдена по идентификатору ${id}` })
    }

    required.organizationId = updateSettingDto.organizationId
    required.cashboxId = updateSettingDto.cashboxId
    required.snoId = updateSettingDto.snoId
    required.email = updateSettingDto.email
    required.paymentSystemId = updateSettingDto.paymentSystemId
    
    await this.settingsRepository.save(required) 
  }

  async remove(id: string): Promise<void> {
    const settingsId = Id.from(id)
    
    const settings = await this.settingsRepository.getById(settingsId)

    if (settingsId == null) {
      throw new BadRequestException(`Запись не была найдена по идентификатору ${id}`, { cause: new Error(), description: `Запись не была найдена по идентификатору ${id}` })
    }

    await this.settingsRepository.delete(settings)
  }
}
