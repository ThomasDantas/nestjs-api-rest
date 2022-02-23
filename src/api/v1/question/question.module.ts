import { Module } from '@nestjs/common'
import { InfraModule } from '../../../infra/infra.module'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [InfraModule],
})
export class QuestionModule {}
