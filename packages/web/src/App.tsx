import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'
import router from '@/router'
import './App.g.less'

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} fallbackElement={<Spin fullscreen />} />
    </div>
  )
}

export default App
