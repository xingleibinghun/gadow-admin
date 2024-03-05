import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export default TypeOrmModule.forRootAsync({
  useFactory(configService: ConfigService) {
    return {
      type: 'mysql',
      host: configService.get('DB_URI'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true
    }
  },
  inject: [ConfigService]
})
