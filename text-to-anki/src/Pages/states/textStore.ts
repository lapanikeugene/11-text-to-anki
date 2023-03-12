import { create } from "zustand";

interface textState{
    currentText:string,
    currentTitle:string,
    currentLang:string,
    updateText: (text:string)=>void,
    updateTitle:(title:string)=>void,
    updateLang: (lang:string)=>void,
}

export const useTextStore = create<textState>((set,get)=>({
    currentText: "",
    currentTitle:"",
    currentLang:'eng',

    updateText: (text)=>{
        set((state)=>({currentText:text}));
    },
    updateTitle: (title)=>{
        set((state)=>({currentTitle: title}));
    },
    updateLang: (lang)=>{
        set(
            (state)=>({
                currentLang:lang,
            })
        )
    }


}))