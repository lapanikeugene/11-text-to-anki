import { useRef, useState } from "react";
import { textInDb } from "../../../db/connectDB";
import { AlltextStore } from "../Store/AllTextsStore";


const SearchComponent = ()=>{
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const setTextsToStore = AlltextStore(s=>s.setTexts);
    const textDB = AlltextStore(s=>s.textsDB);
    const resetTextDB = AlltextStore(s=>s.resetTextsDB);
    const backupBD = AlltextStore(s=>s.backUpTextsDB);
 // написать, что сперва я использовал усе эффект который зависил от юсрефа, но окозалось, это не работает. 
 const handleSearch = async()=>{
    // console.log("check search...")
    let value = inputSearchRef.current?.value || "";
    if(value ==="") resetTextDB();
    else{
            setTextsToStore(backupBD.filter(s=>s.title.includes(value)));
    }

}
    return (<>
     <input placeholder="Search..." ref={inputSearchRef} onChange={handleSearch} />
    </>)
}


export default SearchComponent;