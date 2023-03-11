import { Pagination } from "@mui/material"
import { useEffect, useState } from "react";
import { useTextStore } from "../../states/textStore";
import { AddedTextStore } from "../Store/AddedTextStore";
import { paragraphsPerPage } from "./WordSettings";


const TextPagination = ()=>{
    const {page,setPage} = AddedTextStore(s=>s);
    const curText = useTextStore(s=>s.currentText)
    const [p,setP] = useState(1);
    const [t,setT] = useState(0);

    const handlePage=(e:React.ChangeEvent<unknown>,p:number)=>{
        setPage(p);
    }

    useEffect(()=>{setP(page)},[page]);
    useEffect(()=>{setT(curText.trim().replaceAll(/\n\s*\n/g, '\n').split(/\r?\n/).length)},[curText])

    return(<>
          
            <Pagination count={Math.ceil(t/paragraphsPerPage)} 
                        variant="outlined" 
                        onChange={handlePage} 
                        page={p} />
    </>)
}




export default TextPagination