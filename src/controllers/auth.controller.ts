import { Request, Response } from 'express';
import { registration } from '@/services/auth.service';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { DatabaseError } from '@/errors/DatabaseError';
import httpStatus from 'http-status';
import { jwtTokenLivetoSec } from '@/utils/jwtTokenLivetoSec';
import { jwtConfig } from '@/config/jwt';

class AuthController {
  async registration(request: Request, response: Response) {
    try {
      const { email, password, firstname, lastname } = request.body;
      const userData = await registration(email, password, firstname, lastname);
      response.cookie('refreshToken', userData.refreshToken, {
        maxAge: jwtTokenLivetoSec(jwtConfig.refresh.options.expiresIn),
        httpOnly: true,
      });
      const newUser = await registration(email, password, firstname, lastname);
      response.status(201).send(newUser);
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
}

const authController = new AuthController();

export { authController };
