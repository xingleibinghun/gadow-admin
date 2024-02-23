import { RouteObject } from 'react-router-dom'

export type RouterObjectExtra = Omit<RouteObject, 'children'> & {
  children?: RouterObjectExtra[]
  meta?: {
    requireLogin?: boolean
    permissions?: string[]
    label?: string
    icon?: any
  }
  component?: () => Promise<{ default: unknown }>
}
