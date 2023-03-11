import { Box, Button, Skeleton } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { routsLinks } from '../../routes/routsLinks';


const MainPage = ()=>{
    const [count, setCount] = useState(0)

    const navigate = useNavigate();

    const handleClick = (link:string)=>(e:React.MouseEvent) => {
      navigate(link);
    }

  
    return (<>
    
      <div className="card">
      <Skeleton variant="rectangular" width={800} height={400}>
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
        <Button onClick={handleClick(routsLinks.NEW_TEXT)}>Add Text</Button>
        <Button onClick={handleClick(routsLinks.ALL_TEXT)}>All Texts</Button>
       
      </div>
      
    
    </>)
}


export default MainPage;