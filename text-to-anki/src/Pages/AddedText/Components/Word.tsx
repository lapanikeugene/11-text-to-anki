import { useEffect, useState } from "react";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { AddedTextStore } from "../Store/AddedTextStore";
import { defaultWordColor, levelsOfWordColors } from "./WordSettings";
/**
 * component of every word of text 
 * 
 * 
 */
const Word = (params:{word:string})=>{
    //  [] are used to define a character set
    // \w word
    // \s whitespace
    // g global
    // ^ not
    // reg exp, to that will get all commas and so on 
    const marksReg = /[^\w\s']/g;
    const punctuationalMarks = params.word.match(marksReg);
    const [wordLevel,setWordLevel] = useState(0);
    const [bg,setBg] = useState(defaultWordColor); // see settings
    const [cursor,setCursor] = useState('cursor-progress')
    const [locked,setLocked] = useState(true); // lock component till info not fetched. 

    //every level should have it's own color, the last level is empty, it shows that user knows the word
    const bgs = levelsOfWordColors; // see settings
    const updateText = AddedTextStore(s=>s.updateText);

    const word = params.word.replace(marksReg,"");


    useEffect(()=>{
        const r = async()=>{
            const wordFromDb =await WordsModel.getWord(word);  
           if(wordFromDb ===undefined){
                await WordsModel.addWord(word);
                setWordLevel(0);
            }else{
                // console.log(wordFromDb!)
                setWordLevel(wordFromDb!.level ||0)
            }
            setLocked(false);

           
        console.log(await WordsModel.getWord(word));
        }
        r();

        
    },[])

    useEffect(()=>{
        console.log('update bg to ',bgs[wordLevel],wordLevel)
        setBg(bgs[wordLevel]);
    },[wordLevel]); 

    const handleClick =async()=>{
        if(!locked){
        console.log("click on word");
        await WordsModel.updateLevel(word,2);
        updateText();
        }
        
    }


    useEffect(()=>{
        setCursor(locked ? 'cursor-progress' : 'cursor-pointer')
    },[locked])
    return(<>
    
    <span className={` ${bg} rounded-md py-1 px-2 ${cursor}  hover:font-bold`} onClick={handleClick}>
        {params.word.replace(marksReg,"")}
    </span>{punctuationalMarks} 
    </>)
}


export default Word;