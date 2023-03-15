import { useRef, useState } from "react";
import { textInDb } from "../../../db/connectDB";
import { FormStyles } from "../../_assets/css/FormStyles";
import { TextStyles } from "../../_assets/css/TextStyles";
import { AlltextStore } from "../Store/AllTextsStore";


const SearchComponent = ()=>{
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const setTextsToStore = AlltextStore(s=>s.setTexts);
    const textDB = AlltextStore(s=>s.textsDB);
    const resetTextDB = AlltextStore(s=>s.resetTextsDB);
    //this variable need to effectively return to the previous search results. 
    const backupBD = AlltextStore(s=>s.backUpTextsDB);
    
    
    const handleSearch = async()=>{
    // console.log("check search...")
    let value = inputSearchRef.current?.value || "";
    if(value ==="") resetTextDB();
    else{
            setTextsToStore(backupBD.filter(s=>s.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
    }

}
    return (<div className="flex justify-start items-center h-20 mt-4">
        <div className={`p-3 h-full flex items-center text-lg lg:text-3xl ${TextStyles.fontStyle}`}>Search</div>
        <div className="w-full ">
            <input  placeholder="Enter title..." 
                    ref={inputSearchRef} 
                    onChange={handleSearch} 
                    className={FormStyles.inputStyle} />
        </div>
    </div>)
}


export default SearchComponent;