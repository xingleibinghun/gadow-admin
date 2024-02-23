import React from 'react'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from 'react-router-dom'
import RouteWrapper from './routeWrapper'
import { ROUTER_CONFIG } from './config'

export * from './config'

const getRoutes = () => {
  const getRoute = (route: any) => {
    const { element, Component, component, ...rest } = route
    const nextElement =
      route.element || route.component ? <RouteWrapper {...route} /> : undefined
    return (
      <Route key={route.id} element={nextElement} {...rest}>
        {route.children?.map(getRoute)}
      </Route>
    )
  }
  return createRoutesFromElements(ROUTER_CONFIG.map(getRoute))
}

const router = createBrowserRouter(getRoutes())

export default router
