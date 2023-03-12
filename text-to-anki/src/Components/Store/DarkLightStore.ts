import { create } from "zustand"

interface DarkLightInterface{
    mode:string,
    setMode:(mode:string)=>void
}


export const DarkModeState = create<DarkLightInterface>((set,get)=>({
    mode:'',
    setMode:(mode)=>{
        set(
            (state)=>({
                
                mode,
            })
        )
    },
}))