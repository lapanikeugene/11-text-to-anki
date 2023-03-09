import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { textDB, textInDb } from "../../../db/connectDB";
import { IndexDB } from "../../../db/indexdb/indexdb";
import { routsLinks } from "../../../routes/routsLinks";
import { useTextStore } from "../../states/textStore";
import { AlltextStore } from "../Store/AllTextsStore";
import EditFields from "./EditFields";



const TextFields = ()=>{
    const navigate =useNavigate();
    const [textsToRender,setTexts] = useState<textInDb[]>([]);
    const [showEdit,setShowEdit] = useState(-1);
    const showEditSection = AlltextStore(s=>s.showEdit); 
    const updatePage = AlltextStore(s=>s.updatePage);
    const currentVisibleEditSection = AlltextStore(s=>s.editShown);
    const textsFromStore = AlltextStore(s=>s.textsDB);

    const updateLearningText = useTextStore(s=>s.updateText);



    useEffect(()=>{
        setTexts(textsFromStore);
    },[textsFromStore])

    useEffect(()=>{
        setShowEdit(currentVisibleEditSection);
    },[currentVisibleEditSection]);









    const handleDelete =(id:number=-1)=> async(e:React.MouseEvent)=>{
        if(id!==-1){
            await IndexDB.deleteText(id);
            updatePage();
        }

    }

    const handleShowEdit = (id:number=-1)=>async(e:React.MouseEvent)=>{
        if(id!==-1){
            showEditSection(id);
        }
    }

    const handleTitle=(a:string)=>(e:React.MouseEvent)=>{
        updateLearningText(a);
        navigate(routsLinks.LEARN_TEXT);
    }

    return(<>
     {textsToRender.map((a,i)=>{
        return (<div key={`text-${i}`}>
          {i+1}. <strong onClick={handleTitle(a.content)} placeholder="Learn Text...">{a.title}</strong>
          <button onClick={handleShowEdit(i)}>Edit</button>
          <button onClick={handleDelete(a.id)}>Delete</button>
            {showEdit === i &&<EditFields data={a} index={i} />}
        </div>)
    })}
    </>)
}


export default TextFields;