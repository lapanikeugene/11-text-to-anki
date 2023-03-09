import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDBConnection } from "../../hooks/dbConnection";
import { routsLinks } from "../../routes/routsLinks";
import { useTextStore } from "../states/textStore";
import Word from "./Components/Word";
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

    useEffect(()=>{
        console.log(getTextVersion);
        setVer(getTextVersion);
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
        {textForRender.split(/\r?\n/).map((a,i)=>{
            return (
                <div key={`paragraph-${i}`} className={"text-left my-3 leading-8"}>
                {a.split(" ").map((word,word_index)=>{
                    return (<>
                        <Word word={word} key={`word-${word_index}-ver-${ver}`} />{" "}
                    </>)
                })}
                </div>
            )
        })}
      
    </div>

    <div>
        Word count: {textForRender.split(" ").length};
    </div>
    </>)
}


export default AddedText