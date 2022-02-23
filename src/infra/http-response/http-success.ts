import { HttpResponse } from '../http.protocol'
import { HttpStatus } from '@nestjs/common'

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatus.OK,
  body: data,
})

export const created = (data: any): HttpResponse => ({
  statusCode: HttpStatus.CREATED,
  body: data,
})

export const updated = (): HttpResponse => ({
  statusCode: HttpStatus.NO_CONTENT,
})

export const removed = (): HttpResponse => ({
  statusCode: HttpStatus.NO_CONTENT,
})
