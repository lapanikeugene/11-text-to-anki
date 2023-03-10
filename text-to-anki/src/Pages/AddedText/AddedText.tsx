import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDBConnection } from "../../hooks/dbConnection";
import { routsLinks } from "../../routes/routsLinks";
import { useTextStore } from "../states/textStore";
import Word from "./Components/Word";
import { paragraphsPerPage } from "./Components/WordSettings";
import { AddedTextStore } from "./Store/AddedTextStore";


const AddedText = ()=>{

    const navigate = useNavigate();
    const curText = useTextStore(s=>s.currentText);
    const [textForRender,setTextForRender] = useState<string>("");
    const [ver,setVer] = useState(0);
    const handleAlltexts = ()=>{
        navigate(routsLinks.ALL_TEXT);
    }

    const getTextVersion = AddedTextStore(s=>s.counter);

    //need to update child component 
    useEffect(()=>{
        console.log(getTextVersion);

        // setTextForRender(""); 
        //remove all extra \n
      setTextForRender(curText.replaceAll(/\n\s*\n/g, '\n'));

      
    },[])

    const [paragraph,setParagraph]=useState(1);
    const handlePage=(e:React.ChangeEvent<unknown>,p:number)=>{
        setParagraph(p);
    }
    useEffect(()=>{
        console.log(getTextVersion);
        setVer(getTextVersion);
        console.log(Math.ceil(textForRender.split(/\r?\n/).length/4));
        // setTextForRender(""); 
    },[getTextVersion])

    return(<>
    <h1>Your text:</h1>
    <div>
        <input placeholder="Title..." />
    </div>
    <div>
        <button>I know all</button>
        <button>Add new text</button>
        <button onClick={handleAlltexts}>All texts</button>
    </div>
    <div>
        {(paragraph-1)*paragraphsPerPage} {paragraph*paragraphsPerPage} {textForRender.split(/\r?\n/).length}
        {textForRender.split(/\r?\n/)
        .filter((a,i)=> (paragraph==0? i>=0 &&i<=(paragraphsPerPage-1)  
                        :   i>(paragraph-1)*paragraphsPerPage)&&
                            i<=(paragraph)*paragraphsPerPage)
        
        .map((a,i)=>{
            return (
                <div key={`paragraph-${i}`} className={"text-left my-3 leading-8"}>
                  {i}. 
                {a.split(" ")    
                .map((word,word_index)=>{
                    return (<>{
                    
                      <>
                        <Word word={word} key={`word-${word_index}-ver-${ver}`} />{" "}
                        </>}
                    </>)
                })}
                </div>
            )
        })}
      
    </div>
    <div>
    <Pagination count={Math.ceil(textForRender.trim().split(/\r?\n/).length/paragraphsPerPage)} variant="outlined" onChange={handlePage} page={paragraph} />
    </div>

    <div>
        Word count: {textForRender.split(" ").length};
    </div>
    </>)
}


export default AddedText