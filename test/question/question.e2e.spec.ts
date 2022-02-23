import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { InfraModule } from '../../src/infra/infra.module'
import { AppModule } from '../../src/app.module'
import { QuestionRepository } from '../../src/infra/adapter/database/repository/question.repository'
import QuestionRepositoryMock from './question-repository.mock'
import { OptionRepository } from '../../src/infra/adapter/database/repository/option.repository'
import OptionRepositoryMock from './option-repository.mock'

describe('Questions e2e', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, InfraModule],
    })

      .overrideProvider(QuestionRepository)
      .useValue(QuestionRepositoryMock)
      .overrideProvider(OptionRepository)
      .useValue(OptionRepositoryMock)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it(`POST /v1/questions/{id} should return status=201 and body=object`, async () => {
    const body = QuestionRepositoryMock.data[0]
    const statusCode = 201
    const expectedData = {
      body,
      statusCode,
    }

    return request(app.getHttpServer())
      .post('/v1/questions/e784f753-2b01-4604-96f2-c483bd3d8510')
      .set({ Accept: 'application/json' })
      .send({
        statement: 'Qual o sentido da vida, do universo e tudo mais?',
        options: [
          {
            id: 'string',
            key: 'A',
            value: 'beber cafe',
            correct: true,
          },
        ],
      })
      .timeout(5000)
      .expect(statusCode)
      .expect(expectedData)
  })

  it(`GET /v1/questions/{id} should return status=200 and body=array`, async () => {
    const body = QuestionRepositoryMock.data
    const statusCode = 200
    const expectedData = {
      body,
      statusCode,
    }

    return request(app.getHttpServer())
      .get('/v1/questions/e784f753-2b01-4604-96f2-c483bd3d8510')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
      .expect(expectedData)
  })

  it(`PUT /v1/questions/{id} should return status=204`, async () => {
    const statusCode = 204

    return request(app.getHttpServer())
      .put('/v1/questions/e784f753-2b01-4604-96f2-c483bd3d8510')
      .set({ Accept: 'application/json' })
      .send({
        statement: 'Qual o sentido da vida, e eh isso',
        options: [
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'A',
            value: 'andar de moto',
            correct: true,
          },
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'g',
            value: 'pc',
            correct: false,
          },
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'C',
            value: 'festa',
            correct: false,
          },
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'D',
            value: 'estudar',
            correct: false,
          },
        ],
      })
      .timeout(5000)
      .expect(statusCode)
  })

  it(`PUT /v1/questions/{id} should return status=404 when not found`, async () => {
    const statusCode = 404

    return request(app.getHttpServer())
      .put('/v1/questions/string')
      .set({ Accept: 'application/json' })
      .send({
        statement: 'Qual o sentido da vida, e eh isso',
        options: [
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'A',
            value: 'andar de moto',
            correct: true,
          },
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'g',
            value: 'pc',
            correct: false,
          },
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'C',
            value: 'festa',
            correct: false,
          },
          {
            id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
            key: 'D',
            value: 'estudar',
            correct: false,
          },
        ],
      })
      .timeout(5000)
      .expect(statusCode)
  })

  it(`DELETE /v1/questions/{id} should return status=204`, async () => {
    const statusCode = 204

    return request(app.getHttpServer())
      .delete('/v1/questions/e784f753-2b01-4604-96f2-c483bd3d8510')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
  })

  it(`DELETE /v1/questions/{id} should return status=404 when not found`, async () => {
    const statusCode = 404

    return request(app.getHttpServer())
      .delete('/v1/questions/string')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
  })
})
