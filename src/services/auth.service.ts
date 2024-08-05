import { DatabaseError } from '@/errors/DatabaseError';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { createUser, getUserByEmail } from '@/services/user.service';
import { generateTokens, saveToken } from './token.service';
import { UserDto } from '@/dto/User.dto';
import { AuthUserResponse } from '@/dto/AuthUserResponse.dto';
import bcrypt from 'bcrypt';
import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { InvalidDataError } from '@/errors/InvalidDataError';

export const registration = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  try {
    const newUser = await createUser(email, password, firstname, lastname);
    const userDto: UserDto = {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname
    }
    const tokenPair = generateTokens({ ...userDto });
    await saveToken(newUser.id, tokenPair.refreshToken);

    const userWithTokens: AuthUserResponse = {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      avatarpath: newUser.avatar,
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
    }

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

export const login = async (
  email: string,
  password: string
) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw new InvalidDataError('Invalid password');
    }

    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    }
    const tokenPair = generateTokens({ ...userDto });
    await saveToken(user.id, tokenPair.refreshToken);

    const userWithTokens: AuthUserResponse = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      avatarpath: user.avatar,
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
    }
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

