//Strategy for jwt configs
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../auth/types/auth.model'
import { Model } from 'mongoose'
import { User } from 'src/user/types/user.model'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User') private User: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate({ id }: JwtPayload) {
    const user = await this.User.findById(id).select('-password')

    if (!user || (user && user.is_disabled)) throw new UnauthorizedException()
    return { id }
  }
}
