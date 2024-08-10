import { Request, Response } from 'express';
import { login, logout, registration } from '@/services/auth.service';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { DatabaseError } from '@/errors/DatabaseError';
import httpStatus from 'http-status';
import { jwtTokenLivetoSec } from '@/utils/jwtTokenLivetoSec';
import { jwtConfig } from '@/config/jwt';
import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { InvalidDataError } from '@/errors/InvalidDataError';

class AuthController {
  async registration(request: Request, response: Response) {
    try {
      const { email, password, firstname, lastname } = request.body;
      const userData = await registration(email, password, firstname, lastname);
      console.log('UserData', userData);
      response.cookie('refreshToken', userData.refreshToken, {
        maxAge: jwtTokenLivetoSec(jwtConfig.refresh.options.expiresIn),
        httpOnly: true,
      });
      response.status(httpStatus.CREATED).send(userData);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        response.status(httpStatus.CONFLICT).send(error.message);
      } else if (error instanceof DatabaseError) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      } else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal server error');
      }
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const userData = await login(email, password);
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
  }

  async logout(request: Request, response: Response) {
    try {
      const { refreshToken } = request.cookies;
      await logout(refreshToken);
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
  }
}

const authController = new AuthController();

export { authController };
