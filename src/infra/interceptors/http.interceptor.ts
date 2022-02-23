import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    {
      return next.handle().pipe(
        tap((data) => {
          const res = context.switchToHttp().getResponse()
          return (res.statusCode = data.statusCode)
        }),
      )
    }
  }
}
