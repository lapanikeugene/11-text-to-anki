import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { textDB, textInDb } from "../../../db/connectDB";
import { IndexDB } from "../../../db/indexdb/indexdb";
import useNavigateToLink from "../../../hooks/navigateToLink";
import { routsLinks } from "../../../routes/routsLinks";
import { AddedTextStore } from "../../AddedText/Store/AddedTextStore";
import { EditTextStore } from "../../EditText.tsx/Store/EditTextStore";
import { useTextStore } from "../../states/textStore";
import { FormStyles } from "../../_assets/css/FormStyles";
import { AlltextStore } from "../Store/AllTextsStore";
import EditFields from "./EditFields";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TextFields = ()=>{
    const navigate =useNavigate();
    const [textsToRender,setTexts] = useState<textInDb[]>([]);
    const updatePage = AlltextStore(s=>s.updatePage);
    const resetPage = AddedTextStore(s=>s.setPage);
    const textsFromStore = AlltextStore(s=>s.textsDB);

    const {updateText,updateTitle,updateLang} = useTextStore(s=>s);
    const {setEditedText} = EditTextStore(s=>s);



    useEffect(()=>{
        setTexts(textsFromStore);
    },[textsFromStore])

   
    const handleDelete =(id:number=-1)=> async(e:React.MouseEvent)=>{
        if(id!==-1){
            await IndexDB.deleteText(id);
            updatePage();
        }

    }

    const handleEdit = (title:string,content:string,id:number)=>async(e:React.MouseEvent)=>{
      setEditedText(title,content,id);
      navigate(routsLinks.EDIT_TEXT);
    }

    const handleTitle=(content:string,title:string,lang:string)=>(e:React.MouseEvent)=>{
        resetPage(0);
        
        updateText(content);
        updateTitle(title);
        updateLang(lang)
        navigate(routsLinks.LEARN_TEXT);
    }

    const tdStyle = "px-1 py-1 lg:px-6 lg:py-4";
    return(<div className="text-start">
        <table className=" w-full table-auto border mt-5   ">
            <thead className="bg-slate-400 font-medium text-slate-700 dark:border-neutral-500 dark:bg-neutral-600 dark:text-slate-300">
                <tr>
                    <th className="w-10">
                        No.
                    </th>
                    <th className="w-full">
                        Title
                    </th>
                    <th>Lang</th>
                    <th className=" w-28" colSpan={2}>Control</th>
                    
                </tr>
            </thead>
        <tbody>
     {textsToRender.map((a,i)=>{
        return (
            // TODO: Move colors to settings. 
            <tr  key={`text-${i}`} className={` border-b-2 border-b-slate-300 ${i%2==0?"bg-slate-200":"bg-white dark:bg-slate-300"}`}>
                <td className="flex justify-center items-center text-base  lg:text-2xl py-4">{i+1}.</td>
                <td className={`${tdStyle} text-sm lg:text-xl cursor-pointer hover:bg-slate-600 hover:text-white`}  onClick={handleTitle(a.content,a.title,a.lang)}><strong placeholder="Learn Text...">{a.title}</strong></td>
                <td className="mx-3">{a.lang}</td>
                <td><button onClick={handleEdit(a.title,a.content,a.id || -1)} className={FormStyles.buttonStyle} ><EditIcon /></button></td>
                <td  className={tdStyle}><button onClick={handleDelete(a.id)} className={FormStyles.buttonStyle}><DeleteForeverIcon /></button></td>
            </tr>)
    })}
    </tbody>
    </table>
    </div>)
}


export default TextFields;