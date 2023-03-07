import { useState } from 'react'

import './App.css'
import SiteRoute from './routes/Router'
import { useNavigate,Link } from 'react-router-dom'
import { routsLinks } from './routes/routsLinks'

function App() {
 
  return (
    <div className="App">
      <h1><Link to={routsLinks.MAIN_PAGE}>Learn with Texts</Link></h1>
      <hr />
      <SiteRoute />
    </div>
  )
}

export default App
