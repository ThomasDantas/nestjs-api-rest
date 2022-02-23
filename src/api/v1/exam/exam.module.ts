import { Module } from '@nestjs/common'
import { InfraModule } from '../../../infra/infra.module'
import { ExamController } from './exam.controller'
import { ExamService } from './exam.service'

@Module({
  controllers: [ExamController],
  providers: [ExamService],
  imports: [InfraModule],
})
export class ExamModule {}
