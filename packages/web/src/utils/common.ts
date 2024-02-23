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
 * 解决判断变量类型为函数后进行调用，ts 无法识别问题
 */
type AnyFunction = (...args: unknown[]) => any

export function isFunction<T extends AnyFunction>(value: unknown): value is T {
  return typeof value === 'function'
}

/**
 * 判断是否空值
 *  空值：undefined | null | '' | 空数组 | 空对象 (0不算做空值)
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value: any): boolean {
  if (value === 0) {
    return false
  } else if (isType(value, 'array')) {
    return value.length === 0
  } else if (isType(value, 'object')) {
    return Object.keys(value).length === 0
  }
  return !value
}

export function jsonParse(str?: string | null): object | null {
  if (!str) {
    return null
  }
  try {
    return JSON.parse(str)
  } catch (err) {
    return null
  }
}
