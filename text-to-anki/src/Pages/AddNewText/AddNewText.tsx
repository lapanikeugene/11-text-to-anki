import { useNavigate } from "react-router-dom";
import { useDBConnection } from "../../hooks/dbConnection";
import { routsLinks } from "../../routes/routsLinks";



const AddNewText = ()=>{
    const navigate = useNavigate();
    const [connection] = useDBConnection();


    const handleClick = ()=>{
        console.log(connection);

        navigate(routsLinks.ADDED_TEXT)

    }

    return (<>
    <textarea placeholder="add your text here">

    </textarea>
    <button onClick={handleClick}>Add Text</button>
    </>)
}


export default AddNewText;