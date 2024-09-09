import { User } from "src/user/types/user.model"

export interface Login extends Omit<User, 'password'> {
  access_token: string
}

export interface LoginBody {
  email: string
  password: string
  tenant_slug: string
}

export interface JwtPayload {
  id: string
  tenant: string
}
