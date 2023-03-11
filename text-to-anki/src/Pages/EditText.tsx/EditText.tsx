import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndexDB } from "../../db/indexdb/indexdb";
import useNavigateToLink from "../../hooks/navigateToLink";
import { routsLinks } from "../../routes/routsLinks";
import { FormStyles } from "../_assets/css/FormStyles";
import { EditTextStore } from "./Store/EditTextStore";

const EditText = ()=>{
    const {editedText,editedTitle,id} = EditTextStore(s=>s);
    const [content,setContent] =useState("");
    const [title, setTitle]=useState("");
    const [navigator] = useNavigateToLink();
    const navigate = useNavigate();


    useEffect(()=>{
        setContent(editedText);
        setTitle(editedTitle);

    },[editedText,editedTitle])



    const handleChange =(e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setContent(e.target.value);

    }

    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.target.value);

    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await IndexDB.deleteText(id);
        await IndexDB.addToDB(title,content.replace(/\s+/g, ' '));
        navigate(routsLinks.ALL_TEXT)
    }


    return (<>
     
    <div className="flex justify-between mt-5 uppercase">
      <h3 className="text-orange-500 text-3xl">Edit Text</h3>
      <button className={FormStyles.buttonStyle} 
              onClick={navigator(routsLinks.ALL_TEXT)}>
                All Texts
      </button>
    </div>
    <form   onSubmit={handleSubmit} >
      <div  className="mt-5">
        <input  placeholder="Title..." 
                value={title}
                onChange={handleInputChange}
                className={FormStyles.inputStyle} 
                required>
        </input>
      </div>
      <div className="mt-5">
        <textarea     className={FormStyles.inputStyle} 
                      placeholder="add your text here" 
                      value={content}
                      rows={15} 
                      onChange={handleChange}
                      required />

      </div>
      <div className="flex justify-between items-center"> 
        <button type="submit" 
              
                className={`${FormStyles.buttonStyle} mt-3`}>
                  Submit Changes
        </button>
   
      </div>
    </form>
   
    </>)
}


export default EditText;