import { useEffect, useState } from "react";
import { useTextStore } from "../../../../states/textStore";
import { JpnTextSplitter } from "../../../assets/JpnTextSplitter";

/**
 * 
 * @returns array of text paragraphs in japanese to display in AddedText component
 */
export const usePrepareJpnText = ()=>{
    const [preparedJpnText,setText]= useState<string[][]>([]);
    const currentText = useTextStore(s=>s.currentText)


    useEffect(()=>{
       

        const r = async()=>{
            
        let textToMerge:string[][]=[];
        const rawText=currentText.split(/\r?\n/)
        //split text on paragraphs and than add every paragraph as separate string[] element
        for(const x in rawText){
            const arrOfElements:string[] = await JpnTextSplitter(rawText[x]);
            textToMerge.push([...arrOfElements]);
        }
        setText(textToMerge)
        }

        r();
    },[currentText])



    return [preparedJpnText];
}