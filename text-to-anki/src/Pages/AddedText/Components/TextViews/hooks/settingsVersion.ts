import { useState,useEffect } from "react";
import { SettingsStore } from "../../../Store/SettingsStore";

/**
 * dynamically check the version of Settings
 * @returns current settings version
 */
export const useSettingsVersion =()=>{
    const settingsVersion = SettingsStore(s=>s.settingsVersion);
    const [settingsVer,setSettings] = useState(0);

    useEffect(()=>{
        // console.log("settings updated!", settingsVersion)
        setSettings(settingsVersion)
    },[settingsVersion]);


    return [settingsVer]

}