import { Injectable } from '@nestjs/common'
import { CreateExamRequest } from './infra/request/CreateExamRequest'
import { ExamRepository } from '../../../infra/adapter/database/repository/exam.repository'
import ExamMapper from './infra/mappers/exam.mapper'
import { CreatedExamOkReponse } from './infra/response/CreatedExamOkResponse'
import { ExamIdRequest } from './infra/request/ExamIdRequest'

@Injectable()
export class ExamService {
  constructor(private readonly examRepository: ExamRepository) {}

  async createExam(
    createExamRequest: CreateExamRequest,
  ): Promise<CreatedExamOkReponse> {
    const exam = await this.examRepository.store(createExamRequest)
    return ExamMapper.CreatedExamResponse(exam)
  }

  async getAllExams(): Promise<CreatedExamOkReponse[]> {
    const exam = await this.examRepository.getAll()
    return ExamMapper.mapEntitiesExamResponse(exam)
  }

  async updateById(
    examId: ExamIdRequest,
    createExamRequest: CreateExamRequest,
  ): Promise<void> {
    await this.examRepository.updateById(examId.id, createExamRequest)
  }

  async deleteById(examId: ExamIdRequest): Promise<void> {
    await this.examRepository.deleteById(examId.id)
  }
}
