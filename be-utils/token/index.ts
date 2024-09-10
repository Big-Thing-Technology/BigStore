import jwt from 'jsonwebtoken'

export const generateToken = (userId: string, secret: string) => {
  const date = new Date()
  const exp = date.setDate(date.getDate() + 7)
  const contentJwt = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: exp / 1000,
  }

  return jwt.sign(contentJwt, secret, {
    algorithm: 'HS512',
  })
}

export const validateToken = (token: string, secret: string) => {
  return jwt.verify(token, secret, {
    algorithms: ['HS512'],
  }) as any
}

export const decodeToken = (token: string) => {
  return jwt.decode(token) as { userId: string }
}

export const generateCustomerToken = (kanbanInfoId: string, secret: string) => {
  const date = new Date()
  const exp = date.setDate(date.getDate() + 7)
  const contentJwt = {
    kanbanInfoId,
    iat: Math.floor(Date.now() / 1000),
    exp: exp / 1000,
  }

  return jwt.sign(contentJwt, secret, {
    algorithm: 'HS512',
  })
}

export const generateCustomerTokenExpire1Min = (kanbanInfoId: string, secret: string) => {
  const date = new Date()
  const exp = date.setMinutes(date.getMinutes() + 1)
  const contentJwt = {
    kanbanInfoId,
    iat: Math.floor(Date.now() / 1000),
    exp: exp / 1000,
  }

  return jwt.sign(contentJwt, secret, {
    algorithm: 'HS512',
  })
}

export const generateCustomerTokenByMin = (
  kanbanInfoId: string,
  secret: string,
  expire: number
) => {
  const date = new Date()
  const exp = date.setMinutes(date.getMinutes() + expire)
  const contentJwt = {
    kanbanInfoId,
    iat: Math.floor(Date.now() / 1000),
    exp: exp / 1000,
  }

  return jwt.sign(contentJwt, secret, {
    algorithm: 'HS512',
  })
}

export const generateUserTokenExpire1Min = (userId: string, secret: string) => {
  const date = new Date()
  const exp = date.setMinutes(date.getMinutes() + 1)
  const contentJwt = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: exp / 1000,
  }

  return jwt.sign(contentJwt, secret, {
    algorithm: 'HS512',
  })
}

export const decodeCustomerToken = (token: string) => {
  return jwt.decode(token) as { kanbanInfoId: string }
}
