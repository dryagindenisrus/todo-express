import { Response, Request } from 'express';

class UserController {
  async getUser(request: Request, response: Response) {
    response.send({});
  }

  async getAllUsers(request: Request, response: Response) {
    response.send([]);
  }

  async createUser(request: Request, response: Response) {
    response.send({});
  }

  async updateUser(request: Request, response: Response) {
    response.send({});
  }

  async updateUserAvatar(request: Request, response: Response) {
    response.send({});
  }

  async deleteUser(request: Request<{ id: number }>, response: Response) {
    response.send({});
  }
}

const userController = new UserController();

export { userController };
