import { HttpStatus, HttpException } from '@nestjs/common'

export class ServerError extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal Server Error' },
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}

export class BadRequestError extends HttpException {
  constructor(message) {
    super(
      { statusCode: HttpStatus.BAD_REQUEST, body: { message } },
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class NotFoundError extends HttpException {
  constructor(message) {
    super(
      { statusCode: HttpStatus.NOT_FOUND, body: { message } },
      HttpStatus.NOT_FOUND,
    )
  }
}
