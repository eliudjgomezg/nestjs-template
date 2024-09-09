import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/types/user.schema';
import { MongooseHelpersService } from './mongoose-helpers.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
  ])],
  exports: [MongooseHelpersService],
  providers: [MongooseHelpersService],
})
export class MongooseHelpersModule { }
