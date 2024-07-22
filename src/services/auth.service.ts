import { DatabaseError } from '@/errors/DatabaseError';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { createUser } from '@/services/user.service';
import { generateTokens, saveToken } from './token.service';
import { UserDto } from '@/dto/User.dto';
import { AuthUser } from '@/dto/AuthUser.dto';

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

    const userWithTokens: AuthUser = {
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
