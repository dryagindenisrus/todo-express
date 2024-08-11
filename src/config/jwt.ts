import { v4 } from 'uuid';

export const jwtConfig = {
  access: {
    secret: process.env.JWT_TOKEN_ACCESS || v4(),
    options: {
      expiresIn: process.env.JWT_TOKEN_ACCESS_LIVE || '30m'
    }
  },
  refresh: {
    secret: process.env.JWT_TOKEN_REFRESH || v4(),
    options: {
      expiresIn: process.env.JWT_TOKEN_REFRESH_LIVE || '30d'
    }
  }
};
