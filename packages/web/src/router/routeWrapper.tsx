import React, { Suspense } from 'react'
import { Spin } from 'antd'

/**
 * 路由 HOC
 *  - 权限校验
 * @param props
 * @constructor
 */
const RouteWrapper: React.FC = (props: any) => {
  const { element, component } = props
  const LazyComponent = React.lazy(component)

  return (
    element ?? (
      <Suspense fallback={<SpinForPage />}>
        <LazyComponent />
      </Suspense>
    )
  )
}

export const SpinForPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Spin size="large" />
    </div>
  )
}

export default RouteWrapper
