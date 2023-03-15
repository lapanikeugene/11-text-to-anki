import { useRef } from "react";
import { textDB, textInDb } from "../../../db/connectDB";
import { IndexDB } from "../../../db/indexdb/indexdb";
import { AlltextStore } from "../Store/AllTextsStore";


const EditFields = (params:{data:textInDb,index:number})=>{
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputTitleRef =useRef<HTMLInputElement>(null);
    const setUpdatePage = AlltextStore(s=>s.updatePage);
    const hideEdit = AlltextStore(s=>s.hideEdit);
    
    const handleSave = (id:number=-1)=> async(e:React.MouseEvent) =>{

        if(id!==-1){ 
            // await textDB.texts.update()
            await IndexDB.updateText(id,inputTitleRef.current?.value,textareaRef.current?.value)
            setUpdatePage();
            hideEdit; //TODO: Check
        }
    }
    return(<>
   
            <input defaultValue={params.data.title} ref={inputTitleRef} /><br/>
            <textarea defaultValue={params.data.content} ref={textareaRef} />
            <button onClick={handleSave(params.data.id)}>Save</button>
            
    </>)

}


export default EditFields;