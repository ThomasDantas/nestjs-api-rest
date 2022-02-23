import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import ExamEntity from './exam.entity'
import OptionEntity from './option.entity'

@Entity({ name: 'questions' })
export default class QuestionEntity {
  constructor(
    id: string = null,
    examId: string = null,
    statement: string = null,
  ) {
    this.id = id
    this.examId = examId
    this.statement = statement
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ManyToOne(() => ExamEntity, (exam) => exam.id)
  @JoinColumn({ name: 'exam_id' })
  examId?: string

  @Column({ name: 'statement', type: 'varchar', nullable: false })
  statement: string

  @OneToMany(() => OptionEntity, (option) => option.questionId)
  options?: OptionEntity[]
}
