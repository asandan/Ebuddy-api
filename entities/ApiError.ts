class ApiError {
  code: number;
  message: string;
  constructor(statusCode: number, message: string) {
    this.message = message;
    this.code = statusCode;
  }
}

export default ApiError;
