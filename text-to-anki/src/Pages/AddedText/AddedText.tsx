import { useNavigate } from "react-router-dom";
import { useDBConnection } from "../../hooks/dbConnection";
import { routsLinks } from "../../routes/routsLinks";
import { useTextStore } from "../states/textStore";
import Word from "./Components/Word";


const AddedText = ()=>{

    const navigate = useNavigate();
    const curText = useTextStore(s=>s.currentText);
    const handleAlltexts = ()=>{
        navigate(routsLinks.ALL_TEXT);
    }
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
        {curText.split(/\r?\n/).map((a,i)=>{
            return (
                <div key={`paragraph-${i}`} className={"text-left my-3 leading-8"}>
                {a.split(" ").map((word,word_index)=>{
                    return (<>
                        <Word word={word} key={`word-${word_index}`} />{" "}
                    </>)
                })}
                </div>
            )
        })}
      
    </div>
    </>)
}


export default AddedText