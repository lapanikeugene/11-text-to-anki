import { SettingsStore } from "../../../Store/SettingsStore";


export const useToggleSideBar= ()=>{
    const toggleSideBar = SettingsStore(s=>s.toggleSidebar)

    const handleToggleSideBar = ()=>{
        toggleSideBar();

    }

    return [handleToggleSideBar]

}