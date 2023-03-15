import { useEffect, useRef, useState } from "react";
import {  textDB,textInDb } from "../../db/connectDB";
import { IndexDB } from "../../db/indexdb/indexdb";
import useNavigateToLink from "../../hooks/navigateToLink";
import { routsLinks } from "../../routes/routsLinks";
import { FormStyles } from "../_assets/css/FormStyles";
import { TextStyles } from "../_assets/css/TextStyles";
import EditFields from "./Components/EditFields";
import SearchComponent from "./Components/SearchComponents";
import TextFields from "./Components/TextFields";
import { AlltextStore } from "./Store/AllTextsStore";


const AllTexts = ()=>{
    const currentUpdate = AlltextStore(s=>s.pageUpdates);
    const [navigator] = useNavigateToLink();
    const putTextsToStore = AlltextStore(s=>s.setTexts);
    const putTextsToBackUp = AlltextStore(s=>s.setTextsToBackUp);

    useEffect(()=>{
        const r = async()=>{
        const texts = await IndexDB.getAllTexts(); // get all entries. 
        // setTexts(texts );  
        putTextsToStore(texts);
        putTextsToBackUp(texts);
      //  setTextBackUp(texts);

        // console.log("all texts",texts);  
    }
        r();

    },[currentUpdate])

  
    return(<>
    <h1 className={`lg:text-start ${TextStyles.fontStyle}`}>All texts</h1>
   <div>
    <SearchComponent />
   </div>
   <div>
    <button className={`${FormStyles.buttonStyle} w-full  lg:w-4/12`} onClick={navigator(routsLinks.NEW_TEXT)}>Add New Text</button>
   </div>
        <TextFields />
   
    </>)
}


export default AllTexts;