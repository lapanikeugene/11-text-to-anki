import { useEffect, useState } from "react";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { useTextStore } from "../../states/textStore";


const TextStats = () =>{
    const [amountOfWordsByLevel,setAmountOfWordsByLevel] = useState({all:0,lvl0:0,lvl1:0,lvl2:0,lvl3:0})
    const curText = useTextStore(s=>s.currentText);

    useEffect(()=>{
        const textToCounters = curText.toLocaleLowerCase().replaceAll(/[^\w\s']/g,"").split(" ");

        const  r =async ()=>{
            setAmountOfWordsByLevel({
              all: textToCounters.length,
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