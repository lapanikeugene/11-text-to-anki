import { useEffect, useState } from "react";
import { SettingsStore } from "../../../Store/SettingsStore";


export const useCheckHideLevels =()=>{
    const isHideLevels = SettingsStore(s=>s.isHideLevels);
    const [isHiddenLevels,setIsHidden] = useState(false);

    useEffect(()=>{
        setIsHidden(isHideLevels)
    },[isHideLevels]);


    return [isHiddenLevels]



}