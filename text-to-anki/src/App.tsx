import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SiteRoute from './routes/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SiteRoute />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
      
        <button>Add first text</button>
       
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
