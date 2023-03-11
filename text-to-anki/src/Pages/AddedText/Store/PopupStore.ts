import { create } from "zustand";

export interface popUpInterface{
    x:number,
    y:number,
    visible:boolean,
    word:string,
    level:number,
    translation:string,
    showPopup:()=>void,
    hidePopup:()=>void,
    setXY:(x:number,y:number)=>void,
    updateWordData:(word:string,translation:string,level:number)=>void,

}



export const PopupStore = create<popUpInterface>((set,get)=>({
    x:0,
    y:0,
    word:"",
    level:0,
    translation:"",
    visible:false,
    showPopup:()=>{set((state)=>({visible:true}))},
    hidePopup:()=>{set((state)=>({visible:false}))},

    setXY:(x,y)=>{
        set((state)=>({
            x,y
        }))
    },
    updateWordData:(word,translation,level)=>{
        set((state)=>({
            word,translation,level
        }))
    }
})

)