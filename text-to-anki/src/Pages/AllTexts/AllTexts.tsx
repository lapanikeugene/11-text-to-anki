import { useEffect, useRef, useState } from "react";
import {  textDB,textInDb } from "../../db/connectDB";
import EditFields from "./Components/EditFields";
import SearchComponent from "./Components/SearchComponents";
import TextFields from "./Components/TextFields";
import { AlltextStore } from "./Store/AllTextsStore";


const AllTexts = ()=>{
   


    
  
    const currentUpdate = AlltextStore(s=>s.pageUpdates);

    const putTextsToStore = AlltextStore(s=>s.setTexts);
    const putTextsToBackUp = AlltextStore(s=>s.setTextsToBackUp);

   


    useEffect(()=>{
        const r = async()=>{
        const texts = await textDB.texts.toArray(); // get all entries. 
        // setTexts(texts );  
        putTextsToStore(texts);
        putTextsToBackUp(texts);
      //  setTextBackUp(texts);

        // console.log("all texts",texts);  
    }
        r();

    },[currentUpdate])

  
    
    


   



    return(<>
    <h1>All texts</h1>
   <div>
    <SearchComponent />
   </div>
        <TextFields />
   
    </>)
}


export default AllTexts;