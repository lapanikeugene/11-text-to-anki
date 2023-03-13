import { useEffect, useState } from "react"
import { useTextStore } from "../../../../states/textStore";

/**
 * 
 * @returns array of strings of text  selected by user. 
 */
export const usePrepareSpacedText =()=>{
    const [preperedSpacedText,setText] =useState<string[]>([]);
    const currentText = useTextStore(s=>s.currentText)


    useEffect(()=>{

        
        setText(currentText.replace(/\n\s*\n/g, '\n').split(/\r?\n/))

    },[currentText])





    return [preperedSpacedText as string[]];

}