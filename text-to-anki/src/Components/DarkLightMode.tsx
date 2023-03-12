import { DarkModeState } from "./Store/DarkLightStore"


const DarkLightMode=()=>{
    const setMode =DarkModeState(s=>s.setMode);
    const handleMode= (mode:string)=>(e:React.MouseEvent)=>{
        console.log('set mode',mode);
        localStorage.setItem('color-theme', mode)
        setMode(mode);

    }
    return(<>
    <button onClick={handleMode('dark')}>Dark Mode</button>
    <button onClick={handleMode('light')}>Light Mode</button>
    </>)
}


export default DarkLightMode;