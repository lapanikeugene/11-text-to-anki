import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'
import SiteRoute from './routes/Router'
import { useNavigate,Link } from 'react-router-dom'
import { routsLinks } from './routes/routsLinks'
import DarkLightMode from './Components/DarkLightMode'
import { DarkModeState } from './Components/Store/DarkLightStore'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import SideBar from './Pages/AddedText/Components/SideBar'

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
      <div className='w-full relative'>
      <div className='absolute top-0 right-5'><DarkLightMode /></div>
      </div>
    
      <h1 className='text-4xl text-left lg:text-center lg:text-6xl mb-5'><Link to={routsLinks.MAIN_PAGE}>Kotoba Project</Link></h1>
      <div className='flex justify-around'>
      <a href='https://kanji-helper.com/'  >Learn Japanese</a>
      <a href='mailto:info@kanji-helper.com' >Have Idea?</a>
     </div>
      {/* <hr className='dark:border-gray-900' /> */}
      <div className='w-full h-[2px] m-2 dark:bg-gray-600 bg-slate-300 ' />
      <ThemeProvider theme={theme}>
      <SiteRoute />
      </ThemeProvider>
      <div>
            <SideBar /> 
        </div>
        
    </div>
  )
}

export default App
