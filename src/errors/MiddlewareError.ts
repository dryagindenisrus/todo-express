export class MiddlewareError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'MiddlewareError';
    this.message = message || 'Error, while use middleware';
  }
}
