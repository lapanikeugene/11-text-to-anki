import { create } from "zustand"
import { textInDb } from "../../../db/connectDB"


interface AllTextsState {
    pageUpdates:number,
    editShown:number, 
    textsDB:textInDb[],
    backUpTextsDB:textInDb[],

    hideEdit:()=>void,
    showEdit:(id:number)=>void,
    setTexts:(texts:textInDb[])=>void,
    setTextsToBackUp:(texts:textInDb[])=>void,
    resetTextsDB:()=>void,
    updatePage:()=>void,

}


export const AlltextStore = create<AllTextsState>((set,get)=>({
    pageUpdates:0,
    editShown:-1,
    textsDB:[],
    backUpTextsDB:[],
    setTextsToBackUp:(db)=>{
        set(
            (state)=>({
                backUpTextsDB: db,
            })
        )
    },
    resetTextsDB:()=>{
        console.log("reset db to backup")
        set(
            (state)=>({
                
                textsDB: state.backUpTextsDB,
            })
        )
    },
    setTexts:(db)=>{
        set(
            (state)=>({
                textsDB: db
            })
        )
    },

    hideEdit:()=>{set(
                        (state)=>({
                            editShown:-1
                        })
                    )
                },
    showEdit:(id)=>{set(
                        (state)=>({
                            editShown:id
                        })
                    )
                },
    updatePage:()=>{set(
                        (state)=>({
                            pageUpdates: state.pageUpdates+1 
                        })
                    )
                },


}))