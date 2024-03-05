/**
 * 响应数据
 */
export type Response<T> = {
  code: number
  message?: string
  data?: T
  info?: Record<string, unknown>
}

export type ResForHasPager<T> = Response & {
  data: ResDataForHasPager<T>
}

export type ResDataForHasPager<T> = {
  list: T[]
  count: number
  page: number
  pageSize: number
}

export interface Pager {
  page: number
  pageSize?: number
}
