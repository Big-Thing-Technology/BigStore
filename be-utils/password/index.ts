import bcrypt from 'bcryptjs'

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12)
}

export const comparePassword = (rawPassword: string, hashedPassword: string) => {
  return bcrypt.compare(rawPassword, hashedPassword)
}
