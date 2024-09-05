import { Request, Response } from 'express';

const createUser = async (request: Request, response: Response) => {
  response.send({});
};

const getUser = async (request: Request, response: Response) => {
  response.send({});
};

const updateUser = async (request: Request, response: Response) => {
  response.send({});
};

const deleteUser = async (request: Request<{ id: number }>, response: Response) => {
  response.send({});
};

export const UserController = { createUser, getUser, updateUser, deleteUser };
