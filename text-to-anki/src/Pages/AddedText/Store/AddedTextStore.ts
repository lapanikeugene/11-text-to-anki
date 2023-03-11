import { create } from "zustand";


export interface addedTextInterface{
    counter:number,
    page:number,
    updateText: ()=>void,
    setPage: (page:number)=>void,
} 

export const AddedTextStore = create<addedTextInterface>((set,get)=>({
    counter:0,
    page:0,
    updateText:()=>{
        set(
            (state)=>({
                
                counter:state.counter+1,
            })
        )
    },
    setPage:(page)=>{
        set(
            (state)=>({
                
                page,
            })
        )
    },
    })



)