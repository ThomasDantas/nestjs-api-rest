import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  app.setGlobalPrefix(process.env.BASEPATH)
  app.disable('x-powered-by')
  const options = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  const optionsSwagger =
    process.env.NODE_ENV === 'development'
      ? {}
      : {
          swaggerOptions: {
            supportedSubmitMethods: [],
          },
        }
  SwaggerModule.setup(
    `${process.env.BASEPATH}/docs`,
    app,
    document,
    optionsSwagger,
  )

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(process.env.PORT)

  console.log(
    'SERVER RUNNING =',
    `http://localhost:${process.env.PORT}/${process.env.BASEPATH}/`,
  )
  console.log(
    'SWAGGER =',
    `http://localhost:${process.env.PORT}/${process.env.BASEPATH}/docs`,
  )
}
bootstrap()
