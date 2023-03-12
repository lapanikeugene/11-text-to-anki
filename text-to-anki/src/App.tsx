import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'
import SiteRoute from './routes/Router'
import { useNavigate,Link } from 'react-router-dom'
import { routsLinks } from './routes/routsLinks'
import DarkLightMode from './Components/DarkLightMode'
import { DarkModeState } from './Components/Store/DarkLightStore'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'

function App() {
  const colorMode = DarkModeState(s=>s.mode);
  enum PaletteMode {
    Light = 'light',
    Dark = 'dark',
  }
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode:  localStorage.getItem('color-theme')==='light'? PaletteMode.Light : PaletteMode.Dark,
        },
      }),
    [colorMode],
  );
  
  useEffect(()=>{
    const mode = localStorage.getItem('color-theme')||'light';
    if(mode==='dark')
    document.documentElement.classList.add('dark');
    else
    document.documentElement.classList.remove('dark');
    
  },[colorMode])
  

  return (
    <div className={`App  dark:bg-gray-900`}>

      <h1><Link to={routsLinks.MAIN_PAGE}>Kotoba Project</Link></h1>
      <DarkLightMode />
      <hr />
      <ThemeProvider theme={theme}>
      <SiteRoute />
      </ThemeProvider>
    </div>
  )
}

export default App
