import { useEffect, useState } from "react";
import { useTextStore } from "../../../../states/textStore";
import { AddedTextStore } from "../../../Store/AddedTextStore";

/**
 * get current text version if user changed text 
 * and update it if necessary. 
 * @returns current text version
 */
export const useCheckTextVersion=()=>{
    const currentVersion = AddedTextStore(s=>s.counter);
    const [textVersion,setVersion] = useState(0);

    useEffect(()=>{
        setVersion(currentVersion)
    },[currentVersion]);


    return [textVersion]




}