import { create } from "zustand";

interface textState{
    currentText:string,
    updateText: (text:string)=>void,
}

export const useTextStore = create<textState>((set,get)=>({
    currentText: "",
    updateText: (text)=>{
        set((state)=>({currentText:text}))
    }
}))