import { useEffect, useState } from "react";
import { DarkModeState } from "./Store/DarkLightStore"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { LocalStorageVars } from "../Pages/_assets/db/LocalStorageVars";
const DarkLightMode=()=>{
    const {setMode,mode} =DarkModeState(s=>s);
    const [m,setM] = useState(mode)


    useEffect(()=>{
        
        setM(localStorage.getItem(LocalStorageVars.COLOR_THEME)||'light');
    },[mode])
    const handleMode= (mode:string)=>(e:React.MouseEvent)=>{
        console.log('set mode',mode);
        localStorage.setItem('color-theme', mode)
        setMode(mode);

    }
    return(<>
    {m==='light'    ? <button onClick={handleMode('dark')}><DarkModeIcon /></button>
                    : <button onClick={handleMode('light')} className="bg-slate-600 text-slate-300"><LightModeIcon /></button>
    }
    </>)
}


export default DarkLightMode;