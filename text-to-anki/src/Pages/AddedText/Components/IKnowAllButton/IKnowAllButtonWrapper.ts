import { jp } from "./buttons/jp"
import { spaced } from "./buttons/spaced"

/**
 * factory of buttons "I know all". Type of items 'produced by' factrory depends on language. 
 * @param lang 
 * @param currentText 
 * @param page 
 * @returns array of words for work with DB. 
 */
export const IKnowAllButtonWrapper =(lang:string,currentText:string,page:number)=>{
const fabricObj:{[key:string]:any} = {"jpn":jp,
                    "spaced":spaced}


return fabricObj[lang](currentText,page);

}