import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordsModel } from "../../db/WordsDB/WordsModel";
import useNavigateToLink from "../../hooks/navigateToLink";
import { routsLinks } from "../../routes/routsLinks";
import { useTextStore } from "../states/textStore";
import { FormStyles } from "../_assets/css/FormStyles";
import Popup from "./Components/Popup";
import TextPagination from "./Components/TextPagination";
import TextStats from "./Components/TextStats";
import Word from "./Components/Word";
import { paragraphsPerPage } from "./Components/WordSettings";
import { AddedTextStore } from "./Store/AddedTextStore";
import { PopupStore } from "./Store/PopupStore";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Stack } from "@mui/material";
import { MeCab } from "mecab-client";
import { TextStyles } from "../_assets/css/TextStyles";
/**
 * 
 * @returns page with text that was added to the DB, or selected by user 
 */
const AddedText = ()=>{

    const [navigator] = useNavigateToLink();
    const {currentText,currentTitle,currentLang} = useTextStore(s=>s);
    const [textForRender,setTextForRender] = useState<string>("");
    const [title,setTitle]= useState("");
    const [ver,setVer] = useState(0);
    const [p,setP] = useState(0);
    const curPage = AddedTextStore(s=>s.page);
    const getTextVersion = AddedTextStore(s=>s.counter);
    const hidePopUp = PopupStore(s=>s.hidePopup);
    const updateText = AddedTextStore(s=>s.updateText);
    const mecab = new MeCab();
    const [mecabText,setMecCab] = useState<string[][]>([]);

    const [hideLevels,setHideLevels] = useState(false);
    const marksReg = /[^\w\s']/g;
    //need to update child component 
    useEffect(()=>{
        //remove all extra \n
        const textToRender = currentText.replace(/\n\s*\n/g, '\n');
        setTextForRender(textToRender);
        setTitle(currentTitle)

        if(currentLang==='jpn'){
            const segments =  new Intl.Segmenter('jp', { granularity: 'word' });

            const rawText=currentText.split(/\r?\n/)
            const textToMerge=[];
            for(const x in rawText){
                console.log(rawText[x]);
                const iterator1 = segments.segment(rawText[x]);
                const arrOfElements = Array.from(iterator1).map(obj=>Object.values(obj.segment).join(""));
                console.log(arrOfElements);
                textToMerge.push(arrOfElements);

            }
            console.log(textToMerge)
            setMecCab(textToMerge);    

            
             }

        const r = async()=>{

            
        }
    

    r();

    },[currentText,currentTitle,currentLang])

    // update child words after changing level of any word
    useEffect(()=>{
        console.log(getTextVersion);
        setVer(getTextVersion);
    },[getTextVersion])

    //get current page to render
    useEffect(()=>{
        setP(curPage);
    },[curPage])

    const handleMouseLeave=(e:React.MouseEvent)=>{
       
        hidePopUp();
    }
    const handleKnow = async()=>{
        const words = textForRender.split(/\r?\n/)
        .filter((a,i)=>(p==0? i>=0 &&i<=(paragraphsPerPage-1)  
                        :   i>=((p-1)*paragraphsPerPage)&&
                        i<=((p)*paragraphsPerPage)-1))
                        .join(' ')
                        .replaceAll(/\s+/g, ' ')
                        .trim()
                        .replaceAll(marksReg,'')
                        .toLocaleLowerCase()
                        .split(" ");
        // .map((a,i)=>{a.split(" ")})
        console.log(words);
        await WordsModel.setMassLevel(words,3);
        updateText();

    }
    const handleHide=()=>{
        setHideLevels(s=>!s);
    }

    const handleAnki=async()=>{
        const words = textForRender.split(/\r?\n/)
        .filter((a,i)=>(p==0? i>=0 &&i<=(paragraphsPerPage-1)  
                        :   i>=((p-1)*paragraphsPerPage)&&
                        i<=((p)*paragraphsPerPage)-1))
                        .join(' ')
                        .replaceAll(/\s+/g, ' ')
                        .trim()
                        .replaceAll(marksReg,'')
                        .toLocaleLowerCase()
                        .split(" ");

        const rawData = await WordsModel.getWordsWithTranslations(words);
        console.log(rawData);

        const csvData =  []
        for(const x of rawData){
            csvData.push([x.word,x.translate]);
        }
        
        
         // Convert the data to a CSV format string
  const csvString = csvData.map(row => row.join(",")).join("\n");

  // Create a Blob object with the CSV data
  const blob = new Blob([csvString], { type: "text/csv" });

  // Create a URL to the Blob object
  const url = URL.createObjectURL(blob);

  // Create a link element with the URL and filename
  const link = document.createElement("a");
  link.href = url;
  link.download = title+"_anki.csv";

  // Trigger a click on the link to download the file
  link.click();
    }
    return(<>
    <h1 className={`m-5 ${TextStyles.fontStyle} uppercase`}> {title}</h1>

    <div>
        <button onClick={handleHide}  className={`${FormStyles.buttonStyle} m-1`}>
            {hideLevels ?<><VisibilityIcon fontSize="small" /></>
            :
            <><VisibilityOffIcon fontSize="small"/></>            
        }
        </button>
        <button onClick={handleKnow}  className={`${FormStyles.buttonStyle} m-1`}>I know all</button>
        {/* <button onClick={navigator(routsLinks.EDIT_TEXT)} className={FormStyles.buttonStyle}>Edit Text</button> */}
        <button onClick={navigator(routsLinks.NEW_TEXT)}   className={`${FormStyles.buttonStyle} m-1`}>Add new text</button>
        <button onClick={navigator(routsLinks.ALL_TEXT)}   className={`${FormStyles.buttonStyle} m-1`}>All texts</button>
    </div>
    <div onMouseOut={handleMouseLeave} 
        className={`bg-white border
         border-gray-300 rounded 
         p-3 
         mb-2 
         mt-5
         dark:bg-slate-500
         dark:border-gray-800
         
         `}>
    {currentLang==='jpn'? 
                <>
                {
                   mecabText
                   .filter((a,i)=>(p==0? i>=0 &&i<=(paragraphsPerPage-1)  
                        :   i>=((p-1)*paragraphsPerPage)&&
                        i<=((p)*paragraphsPerPage)-1))
       
                   
                   .map((rows,iRows)=>{
                    return(<div  key={`paragraph-${iRows}`} className={"text-left my-3 leading-8"}>

                        {rows.map((cols,iCols)=>{

                            return(<>
                                {cols=="、"||cols==" "||cols=="（"||cols=="）"||cols=="-"||cols=="："||cols=="。" ?
                                <>{cols}</>:
                                <Word word={cols} key={`jp-word-${iCols}-ver-${ver}-page-${p}`} mode='js' />

                                }
                            </>)
                        })}

                    </div>)

                   }) 
                }
              {/* { mecabText.split(/\r?\n/)
              .filter((a,i)=>(p==0? i>=0 &&i<=(paragraphsPerPage-1)  
              :   i>=((p-1)*paragraphsPerPage)&&
              i<=((p)*paragraphsPerPage)-1))
              .map((jpSentence,jpIndex)=>{

                return(
                
                    <div key={`paragraph-${jpIndex}`} className={"text-left my-3 leading-8"}>
                        {
                            jpSentence.
                        }
                
                <>
                  <Word word={jpword} key={`jp-word-${jpIndex}-ver-${ver}`} mode='js' />
                </>)
                </div>
              })
              
              } */}

                </>
                :<> 
        {textForRender.split(/\r?\n/)
        .filter((a,i)=>(p==0? i>=0 &&i<=(paragraphsPerPage-1)  
                        :   i>=((p-1)*paragraphsPerPage)&&
                        i<=((p)*paragraphsPerPage)-1))
       
        .map((a,i)=>{
            return (
                <div key={`paragraph-${i}`} className={`text-left my-3 leading-8 ${TextStyles.fontStyle}`}>
                    {i}.
                <>
                {hideLevels?<>
                    {a}
                </>
                
                
                :<>
                
                    { a.split(" ")    
                    .map((word,word_index)=>{
                        return (<>
                    
                        {
                            
                        <>
                            <Word word={word.trim()} key={`word-${word_index}-ver-${ver}-page-${p}`} />{" "}
                            </>}
                        </>)
                    })}
               
                </> 
                }</>
                </div>
           )
        })}
      </>}
    </div>
        <div className="text-end">
        <Stack alignItems="center">

            <TextPagination />
        </Stack>
        </div>
        <div className="flex justify-between mb-10 mt-5">
            <div className={`text-start font-bold ${TextStyles.fontStyle}`}>
                <TextStats />
            </div>
            <div className="text-end">
                <button className={FormStyles.buttonStyle} onClick={handleAnki}>Download deck for ANKI</button>
                <p className={TextStyles.fontStyle}>
                    Only words of this page with <strong>translations</strong> will be added to anki deck. <br/>
                    <strong>how to add:</strong> simply drag file by mouse and drop it on anki window. Or import it. 
                </p>
            </div>
        </div>
        <Popup />
    </>)
}


export default AddedText