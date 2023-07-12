import React from 'react'
import { createRoot } from 'react-dom/client'
import './css/styles.css'
import App from './app/App'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
