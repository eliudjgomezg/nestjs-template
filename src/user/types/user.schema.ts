import { Schema } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { FileSchema } from 'src/common/schemas/globals'

export const UserSchema = new Schema({
  name: { type: String, required: true, set: (value) => value.trim() },
  last_name: { type: String, required: true, set: (value) => value.trim() },
  second_last_name: { type: String, required: true, set: (value) => value.trim() },
  email: { type: String, unique: true, required: true, set: (value) => value.toLowerCase().trim() },
  phone: { type: String, set: (value) => value.trim() },
  address: { country: String, city: String },

  is_disabled: { type: Boolean, default: true },
  has_default_password: { type: Boolean, default: true },
  avatar: { type: FileSchema, default: { name: '', url: '' } },
  roles: { type: [String], enum: ['role1', 'role2'] },
  password: String,
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  } catch (error) { return console.log(error) }
})

