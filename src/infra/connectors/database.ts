import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true))
    return this
  }

  public isProduction() {
    const mode = process.env.NODE_ENV
    return mode != 'development'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('TYPEORM_HOST'),
      port: parseInt(this.getValue('TYPEORM_PORT')),
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),

      entities: [
        path.join(__dirname, '../adapter/database/entity', '*.entity.{ts,js}'),
      ],

      migrationsTableName: 'migration',

      migrations: [path.join(__dirname, '../../../migration/*.{ts,js}')],

      cli: {
        migrationsDir: 'migration',
      },

      ssl: false, //this.isProduction(),
    }
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'TYPEORM_HOST',
  'TYPEORM_PORT',
  'TYPEORM_USERNAME',
  'TYPEORM_PASSWORD',
  'TYPEORM_DATABASE',
])

export { configService }
