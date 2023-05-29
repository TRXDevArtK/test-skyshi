import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActivityGroupModule } from './activity-group/activity-group.module';
import { ToDoModule } from './to-do/to-do.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ActivityGroupModule,
    ToDoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
