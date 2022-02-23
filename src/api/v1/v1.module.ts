import { Module } from '@nestjs/common'
import { Routes } from 'nest-router'
import { InfraModule } from '../../infra/infra.module'
import { ExamModule } from './exam/exam.module'
import { QuestionModule } from './question/question.module'

export const routesv1: Routes = [
  {
    path: '/exams',
    module: ExamModule,
  },
  {
    path: '/questions',
    module: QuestionModule,
  },
]

@Module({
  imports: [ExamModule, QuestionModule, InfraModule],
})
export class V1Module {}
