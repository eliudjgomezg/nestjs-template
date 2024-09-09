import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IResponse } from 'src/common/interfaces/IResponse'
import { MongooseHelpersService } from 'src/common/mongoose-helpers/mongoose-helpers.service'
import { User } from './types/user.model'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private User: Model<User>,
    private readonly mongooseHelpers: MongooseHelpersService,
  ) { }

  findAll(query): Promise<IResponse<User[]>> {
    const items = this.mongooseHelpers.findAllWithFilters<User>({ schema: 'User', query, sortBy: { name: 1 } })
    return items
  }

  async findOne(id: string): Promise<IResponse<User>> {
    const response = await this.User.findById(id).select('-password')
    return { response }
  }

  async create(body: User): Promise<IResponse<User>> {
    const response = await this.User.create(body)
    return { response }
  }

  async update(id: string, body): Promise<IResponse<User>> {
    let userToUpdate = body

    const user = await this.User.findById(id)

    if (!body.password) delete userToUpdate.password
    if (body.password) userToUpdate = { ...body, password: await bcrypt.hash(body.password, 10), has_default_password: body.password === `DEVIX-${user.email}` }

    const response = await this.User.findByIdAndUpdate({ _id: id }, userToUpdate, { new: true }).select('-password')
    return { response }
  }

  async remove(id: string): Promise<IResponse<User>> {
    const response = await this.User.findByIdAndDelete(id)
    return { response }
  }
}
