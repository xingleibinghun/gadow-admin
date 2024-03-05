import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException
} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'
import { Timeout } from '@/config'

/**
 * 路由超时拦截器
 * TODO
 *   - 增加路由白名单 or 装饰器支持自定义 timeout
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(Timeout),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException())
        }
        return throwError(err)
      })
    )
  }
}
