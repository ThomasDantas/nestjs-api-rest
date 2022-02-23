import OptionEntity from '../../src/infra/adapter/database/entity/option.entity'
import { NotFoundError } from '../../src/infra/http-response/http-exceptions'

export default class OptionRepositoryMock {
  static data: OptionEntity[] = [
    {
      id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
      key: 'A',
      value: 'beber cafe',
      correct: true,
    },
  ]

  static async store(option: OptionEntity) {
    if (option) return this.data[0]
  }

  static async updateById(
    optionId: string,
    option: OptionEntity,
  ): Promise<void> {
    const findById = await this.getById(optionId)
    if (!findById) throw new NotFoundError('Option not found')

    const { key, correct, value } = option
    await this.store({ id: optionId, key, correct, value })
  }

  static async getById(optionId: string): Promise<OptionEntity> {
    const data = this.data.find((d) => d.id == optionId)
    return data
  }
}
