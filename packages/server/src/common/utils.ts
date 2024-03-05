import { Includes } from '@/types'

/**
 * 数据类型判断
 * @param value
 * @param type 数据类型(大小写不限)
 */
export function isType(value: unknown, type: string): boolean {
  return (
    Object.prototype.toString.call(value).toLowerCase() ===
    `[object ${type}]`.toLowerCase()
  )
}

/**
 * 获取对象中字段值集合
 *   - 若要获取大部分字段，不建议采用该方法，应使用解构与拓展运算符
 *   - 有待类型编程准确化返回值类型
 * @param data
 * @param fields 需要筛选的字段(字段名或者是[原字段名, 目标字段名])的集合
 * @returns
 */
type PickValuesRes<
  Data extends Record<string, unknown>,
  Fields extends string[]
> =
  | {
      [Key in keyof Data]: Includes<Fields, Key> extends true
        ? Data[Key]
        : never
    }
  | Record<string, never>
export function pickValues<
  D extends Record<string, unknown>,
  F extends string[]
>(data: D, fields: F): PickValuesRes<D, F> {
  if (!isType(data, 'object')) return {}
  if (!isType(fields, 'array')) return {}
  return fields.reduce((acc, field) => {
    /**
     * sourceField: 原数据字段
     * targetField: 目前数据字段(函数返回值)
     */
    const [sourceField, targetField] =
      typeof field === 'string' ? [field, field] : field
    acc[targetField] = data[sourceField]
    return acc
  }, {})
}

type ExcludeValues<
  Data extends Record<string, unknown>,
  Fields extends string[]
> =
  | {
      [Key in keyof Data]: Includes<Fields, Key> extends true
        ? never
        : Data[Key]
    }
  | Record<string, never>
export function excludeValues<
  D extends Record<string, unknown>,
  F extends string[]
>(data: D, fields: F): ExcludeValues<D, F> {
  if (!isType(data, 'object')) return {}
  if (!isType(fields, 'array')) return {}
  return Object.keys(data).reduce((acc, field) => {
    if (fields.includes(field)) return acc
    acc[field] = data[field]
    return acc
  }, {})
}

/**
 * 深拷贝
 *   TODO 先简单写一版
 * @param data 深拷贝数据
 */
export const cloneDeep = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 去重
 * @param data 去重数据
 */
export const deduplication = <T>(data: T[]): T[] => [...new Set(data)]
