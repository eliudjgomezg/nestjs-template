import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Public } from 'src/jwt/public.decorator'
import { Login, LoginBody } from './types/auth.model'
import { AuthService } from './auth.service'
import { IResponse } from 'src/common/interfaces/IResponse'
import { ApiVersion } from 'src/common/Enums'

@Controller(`${ApiVersion.V1}/auth`)

export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('login')
  @Public()
  async login(@Body() body: LoginBody): Promise<IResponse<Login>> {
    return this.auth.login(body)
  }

  @Get('whoIAm')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Request() req: any) {
    return this.auth.whoIAm(req.user)
  }
}
