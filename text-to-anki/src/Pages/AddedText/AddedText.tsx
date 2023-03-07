import { useNavigate } from "react-router-dom";
import { useDBConnection } from "../../hooks/dbConnection";
import { routsLinks } from "../../routes/routsLinks";


const AddedText = ()=>{

    const navigate = useNavigate();
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
        place for the text;
    </div>
    </>)
}


export default AddedText