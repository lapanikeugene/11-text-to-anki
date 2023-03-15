import { Pagination, Theme } from "@mui/material"
import { useEffect, useState } from "react";
import { useTextStore } from "../../states/textStore";
import { TextStyles } from "../../_assets/css/TextStyles";
import { AddedTextStore } from "../Store/AddedTextStore";
import { useSettingsVersion } from "./TextViews/hooks/settingsVersion";

const TextPagination = ()=>{
    const {page,setPage} = AddedTextStore(s=>s);
    const curText = useTextStore(s=>s.currentText)
    const [p,setP] = useState(1); // amount of pages for render
    const [t,setT] = useState(0); // amount of paragraphs for render 
    const [parPerPage,setparPerPage]=useState(5);    
    const [settingsVer] = useSettingsVersion();

    const handlePage=(_e:React.ChangeEvent<unknown>,p:number)=>{
        setPage(p);
        
    }

    useEffect(()=>{
        //TODO check LS class.
        setparPerPage(Number(localStorage.getItem('settings-paragraphs-per-page')||5))
        
    },[settingsVer])

    useEffect(()=>{setP(page)},[page]);
    useEffect(()=>{setT(curText.trim().replaceAll(/\n\s*\n/g, '\n').split(/\r?\n/).length)},[curText])

    return(<>
            <Pagination count={Math.ceil(t/parPerPage)} 
                        variant="outlined" 
                        onChange={handlePage} 
                        page={p} 
                        />
    </>)
}




export default TextPagination