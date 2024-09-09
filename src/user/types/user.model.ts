import { Document } from 'mongoose'
import { BaseUser, File } from 'src/common/interfaces/Globals'
import { Tenant } from 'src/tenant/types/tenant.model'

export type User = Document & BaseUser & {
  is_disabled: boolean
  password: string
  has_default_password: boolean
  avatar: File
  default_role: Role
  roles: Role[]

  tenant: Tenant
}

export type Role = 'admin' | 'teacher' | 'student'

