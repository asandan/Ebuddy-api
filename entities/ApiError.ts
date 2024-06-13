class ApiError extends Error {
  code: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.code = statusCode;
  }
}

export default ApiError;
