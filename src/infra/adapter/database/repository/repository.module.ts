import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExamRepository } from './exam.repository'
import { QuestionRepository } from './question.repository'
import { OptionRepository } from './option.repository'

const listOfRepo = [
  TypeOrmModule.forFeature([
    ExamRepository,
    QuestionRepository,
    OptionRepository,
  ]),
]

@Module({
  imports: listOfRepo,
  exports: listOfRepo,
})
export class RepositoryModule {}
