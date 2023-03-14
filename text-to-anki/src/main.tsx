import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { create } from 'zustand'
import App from './App'
import './index.css'


// const useBearStore = create()
// const router = createBrowserRouter([{path:'/',element:<App />}])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter  basename="/kotoba">
    <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
