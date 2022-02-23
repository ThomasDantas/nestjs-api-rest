import { EntityRepository, Repository } from 'typeorm'
import {
  NotFoundError,
  ServerError,
} from 'src/infra/http-response/http-exceptions'
import OptionEntity from '../entity/option.entity'

@EntityRepository(OptionEntity)
export class OptionRepository extends Repository<OptionEntity> {
  async store(option: OptionEntity): Promise<OptionEntity> {
    try {
      return await this.save(option)
    } catch (e) {
      throw new ServerError()
    }
  }

  async updateById(optionId: string, option: OptionEntity): Promise<void> {
    try {
      const findById = await this.findOne({ where: { id: optionId } })
      if (!findById) throw new NotFoundError('Option not found')

      const { key, correct, value } = option
      await this.save({ id: optionId, key, correct, value })
    } catch (e) {
      if (e instanceof NotFoundError) throw e
      throw new ServerError()
    }
  }
}
