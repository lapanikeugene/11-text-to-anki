import { useEffect, useState } from "react";
import { textDB, textInDb } from "../../../db/connectDB";
import { AlltextStore } from "../Store/AllTextsStore";
import EditFields from "./EditFields";



const TextFields = ()=>{
    const [textsToRender,setTexts] = useState<textInDb[]>([]);
    const [showEdit,setShowEdit] = useState(-1);
    const showEditSection = AlltextStore(s=>s.showEdit); 
    const updatePage = AlltextStore(s=>s.updatePage);
    const currentVisibleEditSection = AlltextStore(s=>s.editShown);
    const textsFromStore = AlltextStore(s=>s.textsDB);




    useEffect(()=>{
        setTexts(textsFromStore);
    },[textsFromStore])

    useEffect(()=>{
        setShowEdit(currentVisibleEditSection);
    },[currentVisibleEditSection]);









    const handleDelete =(id:number=-1)=> async(e:React.MouseEvent)=>{
        if(id!==-1){
            await textDB.texts.delete(id);
            updatePage();
        }

    }

    const handleShowEdit = (id:number=-1)=>async(e:React.MouseEvent)=>{
        if(id!==-1){
            showEditSection(id);
        }
    }

    return(<>
     {textsToRender.map((a,i)=>{
        return (<div key={`text-${i}`}>
          {i+1}.  <strong>{a.title}</strong>
          <button onClick={handleShowEdit(i)}>Edit</button>
          <button onClick={handleDelete(a.id)}>Delete</button>
            {showEdit === i &&<EditFields data={a} index={i} />}
        </div>)
    })}
    </>)
}


export default TextFields;