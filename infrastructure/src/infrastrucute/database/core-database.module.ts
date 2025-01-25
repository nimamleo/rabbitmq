import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  IMongoConfig,
  MONGO_CONFIG_TOKEN,
} from './mongodb/config/mongo.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoConfig: IMongoConfig = configService.get(MONGO_CONFIG_TOKEN);
        return {
          uri: mongoConfig.connectionString,
          dbName: mongoConfig.dbName,
        };
      },
    }),
  ],
})
export class CoreDatabaseModule {}
