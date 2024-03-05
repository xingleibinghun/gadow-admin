import { Global, Module } from '@nestjs/common'
import { createClient } from 'redis'
import { ConfigService } from '@nestjs/config'
import { RedisService } from './redis.service'
import { REDIS_CLIENT } from './constant'

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: REDIS_CLIENT,
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('REDIS_URI'),
            port: configService.get('REDIS_PORT')
          },
          database: configService.get('REDIS_DB')
        })
        await client.connect()
        return client
      },
      inject: [ConfigService]
    }
  ],
  exports: [RedisService]
})
export class RedisModule {}
