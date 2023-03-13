import useNavigateToLink from "../../../hooks/navigateToLink"
import { routsLinks } from "../../../routes/routsLinks"
import { FormStyles } from "../../_assets/css/FormStyles";
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { SettingsStore } from "../Store/SettingsStore";
import { useToggleSideBar } from "./TextViews/hooks/toggleSideBar";
import { useCheckHideLevels } from "./TextViews/hooks/useCheckHideLevels";
import { useTextStore } from "../../states/textStore";
import { IKnowAllButtonWrapper } from "./IKnowAllButton/IKnowAllButtonWrapper";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { AddedTextStore } from "../Store/AddedTextStore";

/**
 * 
 * @returns top menu component for added text
 */

const MenuTop = ()=>{
    const [navigator] = useNavigateToLink();
    const [handleToggleSideBar] =useToggleSideBar();
    const toggleHideLevel = SettingsStore(s=>s.toggleHideLevel);
    const [isHiddenLevels] = useCheckHideLevels();
    const {currentLang} = useTextStore(s=>s);
    const updateText = AddedTextStore(s=>s.updateText);
   
    const handleHide=()=>{
        toggleHideLevel();
    }

    const handleKnow = async()=>{
       

        const words = IKnowAllButtonWrapper(currentLang==="jpn" ? 'jpn':'spaced');
        // .map((a,i)=>{a.split(" ")})
        console.log(words);
        await WordsModel.setMassLevel( words);
        updateText();

    }
   

    return(<div>
        <button onClick={handleToggleSideBar} className={`${FormStyles.buttonStyle} m-1`} title="settings"><SettingsIcon /></button>

        <button onClick={handleHide}  className={`${FormStyles.buttonStyle} m-1`} title="Hide/show levels">
            {isHiddenLevels ?<><VisibilityIcon fontSize="small" /></>
            :
            <><VisibilityOffIcon fontSize="small"/></>            
        }
        </button>
        <button onClick={handleKnow}  className={`${FormStyles.buttonStyle} m-1`}>I know all</button>
        {/* <button onClick={navigator(routsLinks.EDIT_TEXT)} className={FormStyles.buttonStyle}>Edit Text</button> */}
        <button onClick={navigator(routsLinks.NEW_TEXT)}   className={`${FormStyles.buttonStyle} m-1`}>Add new text</button>
        <button onClick={navigator(routsLinks.ALL_TEXT)}   className={`${FormStyles.buttonStyle} m-1`}>All texts</button>
    </div>)
}


export default MenuTop