import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException
} from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { ERROR_MESSAGE_MAP } from '@/common/dictionary'
import { Code } from '@/types/enums'
import { isType } from '@/common/utils'

/**
 * 获取错误信息
 * @param exception 异常信息
 * @param code 错误 code
 */
const getExceptionMessage = (exception: any, code: number): string => {
  const response = exception?.getResponse?.()

  if (typeof exception === 'string') return exception

  /**
   * 请求错误
   *   - ValidationPipe 抛错
   */
  if (exception instanceof BadRequestException) {
    if (isType(response?.message, 'string')) return response.message
    if (isType(response?.message, 'array')) return String(response.message?.[0])
    return String(response)
  }

  /**
   * 是否明确抛出错误文案(抛错第一个参数为字符串，即项目代码明确错误文本)
   */
  if (response?.error && response?.message) return response?.message

  return ERROR_MESSAGE_MAP[code] || '服务器繁忙'
}

/**
 * 获取错误 code
 * @param exception 异常信息
 */
const getExceptionCode = (exception: any): number => {
  /**
   * 请求错误
   *   - ValidationPipe 抛错
   */
  if (exception instanceof BadRequestException) return Code.ValidateError
  /**
   * query 执行失败
   */
  if (exception instanceof QueryFailedError) return Code.QueryError
  return exception?.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR
}

/**
 * 异常过滤器
 *   - 针对 class-validator 库抛错信息提取数据
 * TODO
 *   - 添加到异常日志
 */
// 若不指定错误，或许该考虑使用 interceptor
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('AllExceptionsFilter.exception', exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const code = getExceptionCode(exception)
    const message = `ErrorCode: ${code} - ${getExceptionMessage(
      exception,
      code
    )}`

    response.status(status).json({
      code,
      message,
      info: {
        timestamp: new Date().toISOString(),
        path: request.url,
        exception: String(exception)
      }
    })
  }
}
