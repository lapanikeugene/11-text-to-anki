import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  textDB } from "../../db/connectDB";
import { useDBConnection } from "../../hooks/dbConnection";
import { routsLinks } from "../../routes/routsLinks";
import { useTextStore } from "../states/textStore";



const AddNewText = ()=>{
    const navigate = useNavigate();
    // const {currentDB,requestToDB,curDBVersion,updateVersionDB} = useDBConnection(1);
    const [status,setStatus] = useState(""); 
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const useText = useTextStore(s=>s.updateText);
    const handleClick = async()=>{
        // updateVersionDB();
      try{
        console.log( inputRef.current?.value);
        useText( inputRef.current?.value || "");

        const id = await textDB.texts.add({title:inputRef.current?.value || "",content:textareaRef.current?.value || ""})
        setStatus(id.toString());
      }catch(e){
        console.log(e);
      }

        navigate(routsLinks.ADDED_TEXT)

    }

   

    return (<>
    {status}
    <input placeholder="title..." ref={inputRef}></input>
    <textarea placeholder="add your text here" ref={textareaRef}>

    </textarea>
    <button onClick={handleClick}>Add Text</button>
    </>)
}


export default AddNewText;