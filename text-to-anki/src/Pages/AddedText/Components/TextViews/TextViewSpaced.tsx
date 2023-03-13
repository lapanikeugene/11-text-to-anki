import { TextStyles } from "../../../_assets/css/TextStyles";
import { Regs } from "../../../_assets/helpers/Regs";
import { PageFilter } from "../../assets/PageFilter";
import { SettingsStore } from "../../Store/SettingsStore";
import Word from "../Word";
import { useSettingsVersion } from "./hooks/settingsVersion";
import { useCheckHideLevels } from "./hooks/useCheckHideLevels";
import { useCheckTextVersion } from "./hooks/useCheckTextVersion";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { usePrepareSpacedText } from "./hooks/usePrepareSpacedText";

const TextViewSpaced =()=>{
    const [settingsVer] = useSettingsVersion();
    const fontSize = SettingsStore(s=>s.fontSize);
    const [isHiddenLevels] = useCheckHideLevels();
    const [currentPage] = useCurrentPage();
    const [preperedSpacedText] = usePrepareSpacedText();
    const [textVersion]=useCheckTextVersion();
 
    return(<>{
        
        PageFilter(preperedSpacedText,currentPage)          
            .map((a,i)=>{
            return (
                <div key={`paragraph-${i}-settings-${settingsVer}`} className={`text-left my-3 leading-8 ${TextStyles.fontStyle}`}>
                    
                <>
                {isHiddenLevels?<>
                    <p className={fontSize} >{a}</p>
                </>
                
                
                :<>
                
                    { a.replace(Regs.SelectAllPunctuationMarks, (match) => ` ${match} `).split(" ")    
                    .map((word,word_index)=>{
                        return (<>
                    
                        {
                            
                        <>
                            <Word   word={word.trim()}
                                    fontSize={fontSize} 
                                    key={`word-${word_index}-ver-${textVersion}-page-${currentPage}-settings-${settingsVer}`} />{" "}
                            </>}
                        </>)
                    })}
            
                </> 
                }</>
            </div>
       )
    })}
  </>)
}


export default TextViewSpaced;