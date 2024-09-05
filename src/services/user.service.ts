import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { DatabaseError } from '@/errors/DatabaseError';
import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { UserDto } from '@/dto/User.dto';
import { User } from '@/types/user.interface';

const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<UserDto> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new UserAlreadyExistsError('User with this email already exists');
    }

    const hashPassword = (await bcrypt.hash(password, 3)).toString();

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        firstname,
        lastname,
      },
    });

    return newUser;
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      throw error;
    }
    throw new DatabaseError('Error while creating user');
  }
};

const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new UserNotFoundError('User not found');
    }

    return existingUser;
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw error;
    }
    throw new DatabaseError('Error while searching user');
  }
};

export default { getUserByEmail, createUser };
