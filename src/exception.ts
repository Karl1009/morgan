
export type ErrorStatusCode = 200 | 400 | 401 | 403 | 404 | 500;

class Exception extends Error {
  readonly isCustomError: true;
  statusCode: ErrorStatusCode;
  constructor(message: string, _statusCode: ErrorStatusCode = 200) {
    super(message);
    this.isCustomError = true;
    this.name = "Exception"
    this.statusCode = _statusCode;
  }
}

export default Exception;