/**
 * 公共的 ts 编程辅助函数
 */

/**
 * 是否包含
 */
export type Includes<Arr extends unknown[], Target> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEquel<First, Target> extends true
    ? true
    : Includes<Rest, Target>
  : false

/**
 * 是否相等
 *   相等的判断：A 是 B 的子类并且 B 也是 A 的子类
 */
export type IsEquel<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false)
