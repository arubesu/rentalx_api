class RequestError {
  readonly message: string;
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { RequestError };
