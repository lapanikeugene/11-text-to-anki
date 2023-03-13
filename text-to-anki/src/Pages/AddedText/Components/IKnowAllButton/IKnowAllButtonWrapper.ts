import { jp } from "./buttons/jp"
import { spaced } from "./buttons/spaced"

export const IKnowAllButtonWrapper =(lang:string)=>{
const fabricObj:{[key:string]:any} = {"jpn":jp,
                    "spaced":spaced}


return fabricObj[lang]();

}