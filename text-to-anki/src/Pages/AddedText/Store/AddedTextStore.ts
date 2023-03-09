import { create } from "zustand";


export interface addedTextInterface{
    counter:number,
    updateText: ()=>void
} 

export const AddedTextStore = create<addedTextInterface>((set,get)=>({
    counter:0,
    updateText:()=>{
        set(
            (state)=>({
                
                counter:state.counter+1,
            })
        )
    }
    })



)