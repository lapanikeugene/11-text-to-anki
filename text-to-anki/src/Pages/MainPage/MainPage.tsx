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
   

        <div className='dark:text-slate-400 text-start'>
      Our <strong>free</strong> language learning service is designed to help users improve their language skills by adding and reading any texts 
      while simultaneously learning new vocabulary words.<br/>
      <br/>
      When users use our service, they can choose <strong>Japanese or Any language with spaces</strong> to learn and the level of difficulty they prefer. <br/>
      <br/>

      <strong>Service based on already learned words.</strong> As users read, they will encounter unfamiliar words, which will be highlighted. <br/>
      Users can translate and save these new words to their personal database or <strong>download decks of vocabulary words for the Anki app</strong>, a popular spaced repetition flashcard program that helps users retain information over time.<br/><br/>

      Our service offers a <strong>dark and light</strong> mode for users who prefer to read in low light environments.<br/><br/>

      With our free language learning service, users can improve their language skills in an enjoyable and efficient way, while also expanding their cultural knowledge and vocabulary.
      </div> {/* <Skeleton variant="rectangular" width={800} height={400}>
            <div style={{ paddingTop: '57%' }} />
        </Skeleton> */}
        <div className='flex justify-around mt-4'>
          <button onClick={handleClick(routsLinks.NEW_TEXT)} className={FormStyles.buttonStyle}>Add Text</button>
          <button onClick={handleClick(routsLinks.ALL_TEXT)}  className={FormStyles.buttonStyle}>All Texts</button>
        </div>
      </div>
      
    
    </>)
}


export default MainPage;