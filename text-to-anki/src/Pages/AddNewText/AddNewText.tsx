import { Input } from "@mui/material";
import { franc } from "franc";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndexDB } from "../../db/indexdb/indexdb";
import { routsLinks } from "../../routes/routsLinks";
import { useTextStore } from "../states/textStore";
import { FormStyles } from "../_assets/css/FormStyles";
import WordsCount from "./Components/WordsCount";


/**
 * 
 * @returns page with form to add new text into DB. Link: routsLinks.NEW_TEXT
 */
const AddNewText = ()=>{
    const navigate = useNavigate();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const useText = useTextStore(s=>s.updateText);
    const updateTitle = useTextStore(s=>s.updateTitle);
    const [textGot,setText] =useState<string>("")

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      try{
          const text = textareaRef.current?.value || "";
          const title = inputRef.current?.value || "";
          const lang = franc(text)
          console.log(lang)
          //add new text to db
          const id = IndexDB.addToDB(title,text.replace(/[^\S\n]+/g, ' '),lang);
          //add text for edit page to state.
          
          useText(text);
          updateTitle(title)
         
         
      }catch(e){
          console.log(e);
      }
         navigate(routsLinks.ADDED_TEXT)

    }


    const handleAllTexts = () =>{
      navigate(routsLinks.ALL_TEXT)
    }


    const handleChange = ()=>{
      setText(textareaRef.current?.value || "")
    }


    return (<>
    <div className="flex justify-between mt-5 uppercase">
      <h3 className="text-orange-500 text-3xl">Add Text</h3>
      <button className={FormStyles.buttonStyle} 
              onClick={handleAllTexts}>
                All Texts
      </button>
    </div>
    <form   onSubmit={handleSubmit} >
      <div  className="mt-5">
        <input  placeholder="Title..." 
                ref={inputRef} 
                className={FormStyles.inputStyle} 
                required>
        </input>
      </div>
      <div  className="mt-5">
        <textarea     className={FormStyles.inputStyle} 
                      placeholder="add your text here" 
                      ref={textareaRef} 
                      rows={15} 
                      onChange={handleChange}
                      required>

        </textarea>
      </div>
      <div className="flex justify-between items-center"> 
        <button type="submit" 
              
                className={`${FormStyles.buttonStyle} mt-3`}>
                  Add Text
        </button>
       <WordsCount text={textGot}/>
      </div>
    </form>
    </>)
}


export default AddNewText;