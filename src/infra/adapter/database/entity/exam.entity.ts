import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'exams' })
export default class ExamEntity {
  constructor(
    id: string = null,
    name: string = null,
    description: string = null,
    type: string = null,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.type = type
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string

  @Column({ name: 'type', type: 'varchar', nullable: true })
  @Check("type in ('ONLINE', 'OFFLINE')")
  type: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  createdAt?: Date
}
