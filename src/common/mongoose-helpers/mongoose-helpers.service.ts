import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { User } from 'src/user/types/user.model';
import { IResponse } from '../interfaces/IResponse';


interface IRequest {
  schema: string
  query: any
  populate?: string | string[] | Record<string, any>[] | Record<string, any>
  sortBy?: Record<string, number>
}

@Injectable()
export class MongooseHelpersService {
  constructor(
    @InjectModel('User') private User: Model<User>,
  ) { }
  models = {
    User: this.User,
  }

  async findAllWithFilters<T>({ schema, query, populate, sortBy }: IRequest): Promise<IResponse<T[]>> {
    if (Object.keys(query).length) {
      const { page, limit, ...match } = query && JSON.parse(query.filters) || {}
      const skip = (limit * page) - limit
      let resp: IResponse<T[]> = { response: [] }
      const sortProp = sortBy ?? { created_at: 1 }

      const response = await this.models[schema].find(match, null, { skip, limit }).select('-password').lean().sort(sortProp).populate(populate ?? '')
      resp = { ...resp, response }

      if (page && limit) {
        const count: number = await this[schema].count(match)
        const pages: number = Math.ceil(count / limit)
        const metadata = { count, pages }
        resp = { ...resp, metadata }
      }
      return resp
    }
    const response = await this.models[schema].find().select('-password').lean().sort({ created_at: 1 }).populate(populate ?? '')
    return { response }
  }
}
