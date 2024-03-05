import { NestFactory } from '@nestjs/core'
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)

  /**
   * helmet
   */
  app.use(helmet())

  /**
   * limiter
   */
  const limiter = rateLimit({
    windowMs: configService.get('RATE_LIMIT_WINDOWMS'),
    limit: configService.get('RATE_LIMIT_LIMIT')
  })
  app.use(limiter)

  /**
   * Cookie
   */
  app.use(cookieParser())
  app.use((req, res, next) => {
    res.cookie('SameSite', 'Strict')
    next()
  })

  /**
   * CORS
   */
  app.enableCors()

  /**
   * API version
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL
  })

  await app.listen(configService.get('SERVICE_PORT') ?? 3100)
}

bootstrap()
