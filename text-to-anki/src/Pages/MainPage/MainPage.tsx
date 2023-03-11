import { Box, Button, Skeleton } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { routsLinks } from '../../routes/routsLinks';
import { FormStyles } from '../_assets/css/FormStyles';


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
        <div className='flex justify-around mt-4'>
          <button onClick={handleClick(routsLinks.NEW_TEXT)} className={FormStyles.buttonStyle}>Add Text</button>
          <button onClick={handleClick(routsLinks.ALL_TEXT)}  className={FormStyles.buttonStyle}>All Texts</button>
        </div>
      </div>
      
    
    </>)
}


export default MainPage;