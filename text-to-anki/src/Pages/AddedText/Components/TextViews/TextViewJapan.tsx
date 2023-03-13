import { useEffect, useState } from "react";
import { LocalStorageVars } from "../../../_assets/db/LocalStorageVars";
import { SettingsStore } from "../../Store/SettingsStore";
import Word from "../Word";
import { useSettingsVersion } from "./hooks/settingsVersion";
import { useCheckHideLevels } from "./hooks/useCheckHideLevels";
import { useCheckTextVersion } from "./hooks/useCheckTextVersion";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { usePrepareJpnText } from "./hooks/usePrepareJpnText";

const TextViewJapan =()=>{
    const [settingsVer] = useSettingsVersion();
    const fontSize = SettingsStore(s=>s.fontSize);
    const [isHiddenLevels] = useCheckHideLevels();
    const [currentPage] = useCurrentPage();
    const [preparedJpnText]=usePrepareJpnText();
    const paragraphsPerPage = Number(localStorage.getItem(LocalStorageVars.PARAGRAPHS_PER_PAGE));
    const [textVersion]=useCheckTextVersion();


    return(  <>
        {
           preparedJpnText
           .filter((a,i)=>(currentPage==0? i>=0 &&i<=(paragraphsPerPage-1)  
                :   i>=((currentPage-1)*paragraphsPerPage)&&
                i<=((currentPage)*paragraphsPerPage)-1))

           
           .map((rows,iRows)=>{
            return(<div  key={`paragraph-${iRows}-settings-${settingsVer}`} className={"text-left my-3 leading-8"}>


        {isHiddenLevels?<>
            <p className={fontSize} >
                {rows.map((a)=>{return a})}
            </p>
        </>
        :<>
        
                {rows.map((cols,iCols)=>{

                    return(<>
                        {cols=="、"||cols==" "||cols=="（"||cols=="）"||cols=="-"||cols=="："||cols=="。" ?
                        <>{cols}</>:
                        <Word   word={cols} 
                                fontSize={fontSize}
                                key={`jp-word-${iCols}-ver-${textVersion}-page-${currentPage}-settings-${settingsVer}`} mode='js' />

                        }
                    </>)
                })}
            </>}
            </div>)

           }) 
        }
  

        </>)
}


export default TextViewJapan;