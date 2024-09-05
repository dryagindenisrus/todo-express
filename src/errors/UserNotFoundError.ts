export class UserNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UserAlreadyExistsError';
    this.message = message || 'User not found';
  }
}
