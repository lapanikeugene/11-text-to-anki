import { useTextStore } from "../../../../states/textStore";
import { PageFilter } from "../../../assets/PageFilter";
import { AddedTextStore } from "../../../Store/AddedTextStore";

/**
 * 
 * @param currentText 
 * @param page 
 * @returns array of words, ready for work with DB. 
 */
export const spaced = (currentText:string, page:number)=>{
    
    const marksReg = /[^\w\s']/g;
    return PageFilter(currentText.split(/\r?\n/),page)
                        .join(' ')
                        .replaceAll(/\s+/g, ' ')
                        .trim()
                        .replaceAll(marksReg,'')
                        .toLocaleLowerCase()
                        .split(" ");

}