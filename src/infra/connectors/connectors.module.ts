import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { Module } from '@nestjs/common'
import { configService } from './database'

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
})
export class ConnectorsModule {
  constructor(private connection: Connection) {}
}
