import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { routsLinks } from '../../routes/routsLinks';


const MainPage = ()=>{
    const [count, setCount] = useState(0)

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(routsLinks.NEW_TEXT);
    }
  
    return (<>
    
      <div className="card">
      
        <button onClick={handleClick}>Add first text</button>
       
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    
    </>)
}


export default MainPage;