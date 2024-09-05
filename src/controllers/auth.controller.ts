import httpStatus from 'http-status';

import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { jwtTokenLivetoSec } from '@/utils/jwtTokenLivetoSec';
import { jwtConfig } from '@/config/jwt';
import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { InvalidDataError } from '@/errors/InvalidDataError';

const register = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password, firstname, lastname } = request.body;
    const userData = await AuthService.register(email, password, firstname, lastname);
    console.log('UserData', userData);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: jwtTokenLivetoSec(jwtConfig.refresh.options.expiresIn),
      httpOnly: true,
    });
    response.status(httpStatus.CREATED).send(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const userData = await AuthService.login(email, password);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: jwtTokenLivetoSec(jwtConfig.refresh.options.expiresIn),
      httpOnly: true,
    });
    response.status(httpStatus.OK).send(userData);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      response.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error instanceof InvalidDataError) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    } else {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
  }
};

const logout = async (request: Request, response: Response) => {
  try {
    const { refreshToken } = request.cookies;
    await AuthService.logout(refreshToken);
    response.clearCookie('refreshToken');
    response.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      response.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error instanceof InvalidDataError) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    } else {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
  }
};

export const AuthController = { login, logout, register };
