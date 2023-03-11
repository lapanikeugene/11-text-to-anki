import { create } from "zustand";

interface textState{
    currentText:string,
    currentTitle:string,
    updateText: (text:string)=>void,
    updateTitle:(title:string)=>void,
}

export const useTextStore = create<textState>((set,get)=>({
    currentText: "",
    currentTitle:"",
    updateText: (text)=>{
        set((state)=>({currentText:text}));
    },
    updateTitle: (title)=>{
        set((state)=>({currentTitle: title}));
    }


}))