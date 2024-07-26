import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';
import { DatabaseError } from '@/errors/DatabaseError';

export const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
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
