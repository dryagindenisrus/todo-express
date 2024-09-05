import { DatabaseError } from '@/errors/DatabaseError';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import UserService from '@/services/user.service';
import TokenService from './token.service';
import { UserDto } from '@/dto/User.dto';
import { AuthUserResponse } from '@/dto/AuthUserResponse.dto';
import bcrypt from 'bcrypt';
import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { InvalidDataError } from '@/errors/InvalidDataError';

const register = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  try {
    const newUser = await UserService.createUser(email, password, firstname, lastname);
    const userDto: UserDto = new UserDto(newUser);
    const tokenPair = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(newUser.id, tokenPair.refreshToken);

    const userWithTokens: AuthUserResponse = new AuthUserResponse({
      ...newUser,
      avatarpath: null,
      ...tokenPair,
    });

    return userWithTokens;
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      throw new UserAlreadyExistsError(error.message);
    } else if (error instanceof DatabaseError) {
      throw new DatabaseError(error.message);
    } else {
      throw new Error('Registration error');
    }
  }
};

const login = async (email: string, password: string) => {
  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new InvalidDataError('Invalid password');
    }

    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    const tokenPair = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(user.id, tokenPair.refreshToken);

    const userWithTokens: AuthUserResponse = {
      ...user,
      avatarpath: null,
      ...tokenPair,
    };
    return userWithTokens;
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw new UserNotFoundError(error.message);
    } else if (error instanceof DatabaseError) {
      throw new InvalidDataError(error.message);
    } else {
      throw new Error('Login error');
    }
  }
};

const logout = async (refreshToken: string) => {
  try {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw new UserNotFoundError(error.message);
    } else if (error instanceof DatabaseError) {
      throw new InvalidDataError(error.message);
    } else {
      throw error;
    }
  }
};

export const AuthService = { register, login, logout };
