import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseHelpersModule } from 'src/common/mongoose-helpers/mongoose-helpers.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserSchema } from './types/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseHelpersModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
