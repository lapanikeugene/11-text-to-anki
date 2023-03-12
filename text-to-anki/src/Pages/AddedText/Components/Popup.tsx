import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmojiFoodBeverageOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import FontAwesome from "react-fontawesome";
import { WordsModel } from "../../../db/WordsDB/WordsModel";
import { FormStyles } from "../../_assets/css/FormStyles";
import { AddedTextStore } from "../Store/AddedTextStore";
import { PopupStore } from "../Store/PopupStore";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Popup = ()=>{
    const {x,y,visible,word,translation,level,showPopup,hidePopup,updateWordData} = PopupStore(s=>s);
    const [show,setShow]= useState(false);
    const [position,setPosition]= useState({top:-1000, left:-1000})
    const [text,setText] = useState({word:"",translation:"",level:0})
    const updateText = AddedTextStore(s=>s.updateText);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(()=>{
        
        setText({word,translation,level});
    },[word,translation,level])
    useEffect(()=>{ setShow(visible)},[visible])

    useEffect(()=>{
        //set anti over flow popup 
        let upX = window.innerWidth<(x-150)+150 ? x-300 : x-150
        let upY = window.innerHeight<y+window.scrollY+200 ? y-220 : y
        setPosition({left:upX, top:upY})
        // console.log(x,y,show);
    },[x,y])

    const handleOver =(e:React.MouseEvent)=>
    {
        e.stopPropagation();
        showPopup();
    }

    const handleLevel = (level:number)=>async(e:React.MouseEvent)=>{
        await WordsModel.updateLevel(text.word,level);
        hidePopup();
        updateText();
    }

    const handleAdd = async()=>{

        await WordsModel.setTranslate(text.word,inputRef.current?.value ||"");
        updateText();
        hidePopup();
    }

    const handleClose=()=>{
        hidePopup();
    }

    const handleDelete=async()=>{
        await WordsModel.DeleteTranslation(text.word);
        setText({word,translation:"",level});
    }
    return(<>
    {show&&
        <div className={`   min-h-[250px]
                            border 
                            border-1 
                            py-2 
                            px-1
                            border-purple-700 
                            shadow
                            absolute  
                            flex
                            flex-col
                            items-stretch
                            content-around
                            w-[320px]
                            bg-white rounded`} 
            style={{top:position.top,left:position.left}} 
            onMouseOver={handleOver}>

        <div className="absolute right-3 top-1 text-lg cursor-pointer" onClick={handleClose}>X</div>        
        <div className="text-xl font-bold uppercase">{text.word}</div>
       
        <div>{text.translation.length>0 ?<div className="mt-2">Translation:<br/> 
        <strong className="uppercase mr-2">{text.translation}</strong> <DeleteForeverIcon className="cursor-pointer" onClick={handleDelete} /> </div>
                : <>
                <div><strong>Translation not found</strong></div>
                <div><a href={`https://translate.google.com/?op=translate&text=${text.word}`} target="_blank">Google Translate</a></div>
                <div className="flex justify-center items-center mt-3">
                    <input placeholder="Please input translation" 
                            className={"bg-slate-100 w-full hover:bg-white p-1 ml-1 border-1 hover:border-purple-700"}
                            ref={inputRef}></input><br/>
                <div onClick={handleAdd} className="text-green-600 cursor-pointer text-lg" ><AddCircleIcon fontSize="large" /></div>
                </div>
                </>
        }</div>
        <div className="my-3">Rate Your Progress</div>
        <div className="flex justify-around items-center">
          
        <div onClick={handleLevel(0)} className={`  bg-red-500
                                                    w-12
                                                    h-12
                                                    rounded-full
                                                    flex 
                                                    justify-center
                                                    items-center
                                                    bg-clip-content
                                                    p-1
                                                    border-4 
                                                    cursor-pointer
                                                    hover:bg-red-300
                                                    ${(text.level===0 ? `border-blue-600` :``)}
                                                   `}><CloseIcon/></div>
        <div onClick={handleLevel(1)} className={`  bg-pink-500
                                                    w-12
                                                    h-12
                                                    rounded-full
                                                    flex 
                                                    justify-center
                                                    items-center
                                                    bg-clip-content
                                                    p-1
                                                    border-4 
                                                    cursor-pointer
                                                    hover:bg-pink-300
                                                    ${(text.level===1 ? `border-blue-600` :``)}
                                                   `}><StarBorderIcon /></div>
        <div onClick={handleLevel(2)} className={`  bg-amber-500
                                                    w-12
                                                    h-12
                                                    rounded-full
                                                    flex 
                                                    justify-center
                                                    items-center
                                                    bg-clip-content
                                                    p-1
                                                    border-4 
                                                    cursor-pointer
                                                    hover:bg-amber-300
                                                    ${(text.level===2 ? `border-blue-600` :``)}
                                                   `}><StarHalfIcon  /></div>
        <div onClick={handleLevel(3)} className={`  bg-purple-700
                                                    w-12
                                                    h-12
                                                    rounded-full
                                                    flex 
                                                    justify-center
                                                    items-center
                                                    bg-clip-content
                                                    p-1
                                                    border-4
                                                    cursor-pointer
                                                    hover:bg-purple-500
                                                    ${(text.level===3 ? `border-blue-600` :``)}
                                                   `}><FontAwesomeIcon icon={faCheck}  /></div>
        
      
        </div>
    </div>}
    </>)

}


export default Popup;