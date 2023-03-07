import { useState } from 'react'

import './App.css'
import SiteRoute from './routes/Router'
import { useNavigate } from 'react-router-dom'
import { routsLinks } from './routes/routsLinks'

function App() {
 
  return (
    <div className="App">
      <h1>Learn with Texts</h1>
      <hr />
      <SiteRoute />
    </div>
  )
}

export default App
