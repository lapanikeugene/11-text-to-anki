import { create } from "zustand";


interface textStoreInterface{
    editedText:string,
    editedTitle:string,
    id:number,
    setEditedText:(title:string,content:string,id:number)=>void

}


export const EditTextStore = create<textStoreInterface>((set,get)=>({
    editedText:"",
    editedTitle:"",
    id:-1,
    setEditedText:(title,content,id)=>{
        set(
            (state)=>({
                editedText:content,
                editedTitle:title,
                id
            })
        )

    }

}))

