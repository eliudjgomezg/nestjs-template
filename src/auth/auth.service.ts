import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/user/types/user.model'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, Login, LoginBody } from './types/auth.model'
import * as bcrypt from 'bcrypt'
import { IResponse } from 'src/common/interfaces/IResponse'
import { HttpStatus } from '@nestjs/common'

const INVALID_CREDENTIALS = 'El usuario o contraseña son inválidos.'
const DISABLED_ACCOUNT = 'Tu cuenta se encuentra bloqueada. Habla con alguno de los administradores para resolverlo.'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private User: Model<User>,
    private jwtService: JwtService
  ) { }

  async login(body: LoginBody): Promise<IResponse<Login>> {
    const { email, password: bodyPassword } = body

    const user = await this.User.findOne({ email }).lean()

    if (!user) throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)
    if (user.is_disabled) throw new HttpException(DISABLED_ACCOUNT, HttpStatus.UNAUTHORIZED)

    const { password, ...userWithOutPassword } = user
    const isPasswordMatch = await bcrypt.compare(bodyPassword, password)

    if (!isPasswordMatch) throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)

    const payload: JwtPayload = { id: userWithOutPassword._id.toString() }

    return { response: { ...userWithOutPassword, access_token: this.jwtService.sign(payload) } }
  }

  async whoIAm(id: string): Promise<{ response: User }> {
    const response = await (await this.User.findById(id).select('-password'))
    return { response }
  }
}
