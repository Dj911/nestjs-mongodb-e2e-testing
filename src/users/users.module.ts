import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),

    // WITHOUT DECORATOR USING PROVIDER
    // DatabaseModule
  ],
  controllers: [UsersController],
  providers: [UsersService,

    // WITHOUT DECORATOR
    // ...catsProviders

    // WITH DECORATOR
    // {
    //   provide: getModelToken(User.name),
    //   useValue: Model<User>
    // }
  ],
  exports: [UsersService]
})
export class UsersModule { }
