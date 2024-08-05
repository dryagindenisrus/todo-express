import jwt from 'jsonwebtoken';
import { jwtConfig } from '@/config/jwt';
import { prisma } from '@/lib/prisma';
import { UserDto } from '@/dto/User.dto';

export const generateTokens = (payload: UserDto) => {
  const accessToken = jwt.sign(
    payload,
    jwtConfig.access.secret,
    jwtConfig.access.options
  );
  const refreshToken = jwt.sign(
    payload,
    jwtConfig.refresh.secret,
    jwtConfig.refresh.options
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const saveToken = async (userId: number, refreshToken: string) => {
  
  const existingToken = await prisma.token.findUnique({
    where: { userId: userId },
  });

  if (existingToken) {
    await prisma.token.update({
      where: { userId: userId },
      data: { refreshToken: refreshToken },
    });
  } else {
    await prisma.token.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
      },
    });
  }

  return refreshToken;
};

export const removeToken = async (userId: number) => {
  const tokenData = await prisma.token.delete({
    where: {userId},
  })
  return tokenData;
};
