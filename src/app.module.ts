import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { UsersModule } from '@user/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ethan:supernova@cluster0.aob3a.mongodb.net/test?authSource=admin&replicaSet=atlas-etsuv5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'),
    UsersModule,
    HealthModule,
    // ONLY WHEN CREATING SCHEMA WITHOUT DECORATORS
    // DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService/* , ChatGateway */],
})
export class AppModule { }
