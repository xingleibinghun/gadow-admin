/**
 * 响应状态码
 */
export enum Code {
  Success = 0,
  // 通用错误码
  Fail = 1,
  // 登录校验错误
  AuthError = 401,
  // 未检索到数据
  NotFound = 404,
  BadRequest = 10010,
  // ValidationPipe 错误
  ValidateError,
  // 数据库 query 执行出错
  QueryError
}
