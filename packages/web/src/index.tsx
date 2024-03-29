import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import '@/index.g.css'
import App from '@/App'

const container = document.getElementById('root') as Element
const root = createRoot(container)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
