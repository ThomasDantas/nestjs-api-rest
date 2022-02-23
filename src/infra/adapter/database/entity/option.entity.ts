import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import QuestionEntity from './question.entity'

@Entity({ name: 'options' })
export default class OptionEntity {
  constructor(
    id: string = null,
    questionId: string = null,
    key: string = null,
    value: string = null,
    correct: boolean = null,
  ) {
    this.id = id
    this.questionId = questionId
    this.key = key
    this.value = value
    this.correct = correct
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  @JoinColumn({ name: 'question_id' })
  questionId?: string

  @Column({ name: 'key', type: 'varchar', length: 1, nullable: false })
  key: string

  @Column({ name: 'value', type: 'varchar', nullable: false })
  value: string

  @Column({ name: 'correct', type: 'boolean', nullable: false })
  correct: boolean
}
