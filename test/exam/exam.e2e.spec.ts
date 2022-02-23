import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { InfraModule } from '../../src/infra/infra.module'
import { AppModule } from '../../src/app.module'
import { ExamRepository } from '../../src/infra/adapter/database/repository/exam.repository'
import ExamRepositoryMock from './exam-repository.mock'

describe('Exams e2e', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, InfraModule],
    })

      .overrideProvider(ExamRepository)
      .useValue(ExamRepositoryMock)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it(`POST /v1/exams should return status=201 and body=object`, async () => {
    const body = ExamRepositoryMock.data[0]
    const statusCode = 201
    const expectedData = {
      body,
      statusCode,
    }

    return request(app.getHttpServer())
      .post('/v1/exams')
      .set({ Accept: 'application/json' })
      .send({ name: 'string', description: 'string', type: 'ONLINE' })
      .timeout(5000)
      .expect(statusCode)
      .expect(expectedData)
  })

  it(`GET /v1/exams should return status=200 and body=array`, async () => {
    const body = ExamRepositoryMock.data
    const statusCode = 200
    const expectedData = {
      body,
      statusCode,
    }

    return request(app.getHttpServer())
      .get('/v1/exams')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
      .expect(expectedData)
  })

  it(`PUT /v1/exams?id=value should return status=204`, async () => {
    const statusCode = 204

    return request(app.getHttpServer())
      .put('/v1/exams/e784f753-2b01-4604-96f2-c483bd3d8510')
      .set({ Accept: 'application/json' })
      .send({
        name: 'prova AZUL',
        description: 'prova COMPLETA',
        type: 'ONLINE',
      })
      .timeout(5000)
      .expect(statusCode)
  })

  it(`DELETE /v1/exams/{idExam} should return status=204`, async () => {
    const statusCode = 204

    return request(app.getHttpServer())
      .delete('/v1/exams/e784f753-2b01-4604-96f2-c483bd3d8510')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
  })

  it(`PUT /v1/exams/{idExam} should return status=404 when not found`, async () => {
    const statusCode = 404

    return request(app.getHttpServer())
      .put('/v1/exams/string')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
  })

  it(`DELETE /v1/exams/{idExam} should return status=404 when not found`, async () => {
    const statusCode = 404

    return request(app.getHttpServer())
      .delete('/v1/exams/string')
      .set({ Accept: 'application/json' })
      .timeout(5000)
      .expect(statusCode)
  })
})
