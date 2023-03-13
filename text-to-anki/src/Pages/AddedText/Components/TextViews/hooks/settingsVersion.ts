import { useState,useEffect } from "react";
import { SettingsStore } from "../../../Store/SettingsStore";


export const useSettingsVersion =()=>{
    const settingsVersion = SettingsStore(s=>s.settingsVersion);
    const [settingsVer,setSettings] = useState(0);

    useEffect(()=>{
        setSettings(settingsVer)
    },[settingsVersion]);


    return [settingsVer]

}