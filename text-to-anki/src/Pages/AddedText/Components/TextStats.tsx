import { useEffect, useState } from "react";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { useTextStore } from "../../states/textStore";

/**
 * Stats of text. It Works incorrect, should be fixed in the next patches. 
 * @param params japanese array of words in current text if appropriate. 
 * @returns component with stats
 */
const TextStats = (params:{jpLangTexts?:string[]}) =>{
    const [amountOfWordsByLevel,setAmountOfWordsByLevel] = useState({all:0,lvl0:0,lvl1:0,lvl2:0,lvl3:0})
    const curText = useTextStore(s=>s.currentText);
    const currentLang = useTextStore(s=>s.currentLang);

    useEffect(()=>{
        const textToCounters = currentLang ==='jpn'
        ?   params.jpLangTexts||[]
        :   curText.toLocaleLowerCase().replaceAll(/[^\w\s']/g,"").split(" ");
 
        const  r =async ()=>{
            setAmountOfWordsByLevel({
              all: currentLang ==='jpn' ?  params.jpLangTexts?.length ||0 : textToCounters.length,
              lvl0: await WordsModel.getWordsAmountByLevel(textToCounters,0),
              lvl1: await WordsModel.getWordsAmountByLevel(textToCounters,1),
              lvl2: await WordsModel.getWordsAmountByLevel(textToCounters,2),
              lvl3: await WordsModel.getWordsAmountByLevel(textToCounters,3),
              })
          }
      
          r();
    },[])

    return ( <div>
        <h3>Stats of the text</h3>
        <p>Word count: {amountOfWordsByLevel.all} / Learned Words: {amountOfWordsByLevel.lvl3} ;</p>
        <p>Unknown: {amountOfWordsByLevel.lvl0} / Level 1: {amountOfWordsByLevel.lvl1} / Level 2: {amountOfWordsByLevel.lvl2} ;</p>
    </div>)
}



export default TextStats;