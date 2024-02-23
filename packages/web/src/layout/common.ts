import React, { useEffect, useMemo, useState } from 'react'
import { useMatches } from 'react-router-dom'
import { MenuProps } from 'antd'
import { ROUTER_CONFIG_VISIBLE } from '@/router'
import { RouterObjectExtra } from '@/router/types'

/**
 * 生成菜单
 * @param routes
 * @param prefixPath
 */
const generateMenus = (
  routes?: RouterObjectExtra[],
  prefixPath: string = ''
): MenuProps['items'] => {
  if (!routes) return []
  return routes
    .map(route => {
      const { path, meta = {}, children } = route
      const fullPath = `${prefixPath}/${path ?? ''}`
      const nextChild = children
        ? generateMenus(route.children, fullPath)
        : undefined
      return {
        key: fullPath,
        icon: meta.icon ? React.createElement(meta.icon) : undefined,
        label: meta.label,
        children: nextChild?.length ? nextChild : undefined
      }
    })
    .filter(({ label }) => !!label)
}

export const useMenus = () => {
  const matches = useMatches()
  const menus = useMemo<MenuProps['items']>(() => {
    return generateMenus(ROUTER_CONFIG_VISIBLE?.[0]?.children)
  }, [])

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  useEffect(() => {
    setOpenKeys(
      Array.from(
        new Set(openKeys.concat(matches.map(({ pathname }) => pathname)))
      )
    )
    setSelectedKeys([matches[matches.length - 1]?.pathname])
  }, [matches])

  return {
    menus,
    openKeys,
    selectedKeys,
    setOpenKeys
  }
}
