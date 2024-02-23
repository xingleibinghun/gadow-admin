/**
 * 响应数据
 */
export interface Response<T = any> {
  /* 请求错误代码(0 为成功) */
  code: number
  /* 提示信息 */
  message: string
  /* 数据 */
  data: T
}

/**
 * 分页请求参数
 */
export interface PageParams {
  current?: number
  pageSize?: number
}
