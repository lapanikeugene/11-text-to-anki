import { useEffect, useState } from "react";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { TextStyles } from "../../_assets/css/TextStyles";
import { AddedTextStore } from "../Store/AddedTextStore";
import { PopupStore } from "../Store/PopupStore";
import { defaultWordColor, levelsOfWordColors } from "./WordSettings";
/**
 * component of every word of text 
 * 
 * 
 */
type Props= {word:string,mode?:string,fontSize:string}

const Word = (params:Props)=>{
    
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
    const {showPopup,setXY,updateWordData} = PopupStore(s=>s);
 
    //every level should have it's own color, the last level is empty, it shows that user knows the word
    const bgs = levelsOfWordColors; // see settings

  


    useEffect(()=>{
        const r = async()=>{
            const word =params.mode==='js' ? params.word : params.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            const wordFromDb =await WordsModel.getWord(word.trim());  
            // console.log("check word: |",word,"|; result: ", wordFromDb);
           if(wordFromDb.level ===-1){
                await WordsModel.addWord(word);
                setWordLevel(0);
            }else{
                // console.log(wordFromDb!)
                setWordLevel(wordFromDb!.level ||0)
            }
            setLocked(false);

           
        // console.log(await WordsModel.getWord(word));
        }
        r();

        
    },[])

    useEffect(()=>{
        console.log('update bg to ',bgs[wordLevel],wordLevel)
        setBg(bgs[wordLevel]);
    },[wordLevel]); 

    const handleClick =async()=>{
        if(!locked){
            showPopup();
        // console.log("click on word");
        // await WordsModel.updateLevel(word,2);
        // updateText();
        }
        
    }

    

    useEffect(()=>{
        setCursor(locked ? 'cursor-progress' : 'cursor-pointer')
    },[locked])



    const handlMouseOver= async(event:React.MouseEvent )=>{
        // console.log("mouse over",event.clientX,event.clientY);
      
      
        const word =params.mode==='js' ? params.word : params.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLocaleLowerCase();
        const wordInfo = await (await WordsModel.getWord(word));
        // console.log(wordInfo);
        updateWordData(word,wordInfo.translate,wordInfo.level)
        const upX= window.innerWidth <500 ? 200 : event.clientX   
        setXY(upX,event.clientY+window.scrollY);
    }

    return(<>
    {params.word?.match(/[【 】.,\/#!$%\^&\*;:{}=\-_`~()]/g) ? params.word.trim()+" " :
    <span className={` ${bg}  inline-block rounded-md py-1 px-2 ${cursor}  hover:font-bold  ${TextStyles.fontStyle} ${params.fontSize} `} onClick={handleClick} onMouseOver={handlMouseOver}>
        
        { params.word}
    </span> } 
    {" "} 
    </>)
}


export default Word;