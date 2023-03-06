import React from 'react'
import ReactDOM from 'react-dom/client'
import { create } from 'zustand'
import App from './App'
import './index.css'


// const useBearStore = create()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
