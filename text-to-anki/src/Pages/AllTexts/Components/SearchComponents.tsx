import { useRef, useState } from "react";
import { textInDb } from "../../../db/connectDB";
import { FormStyles } from "../../_assets/css/FormStyles";
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
            setTextsToStore(backupBD.filter(s=>s.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
    }

}
    return (<div className="flex justify-start items-center h-20 mt-4">
        <div className="p-3 h-full flex items-center text-3xl">Search</div>
        <div className="w-full ">
            <input  placeholder="Enter title..." 
                    ref={inputSearchRef} 
                    onChange={handleSearch} 
                    className={FormStyles.inputStyle} />
        </div>
    </div>)
}


export default SearchComponent;