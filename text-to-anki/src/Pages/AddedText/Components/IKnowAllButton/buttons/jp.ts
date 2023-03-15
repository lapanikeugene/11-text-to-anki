import { useTextStore } from "../../../../states/textStore";
import { LS } from "../../../../_assets/db/LS";
import { Regs } from "../../../../_assets/helpers/Regs";
import { JpnTextSplitter } from "../../../assets/JpnTextSplitter";
import { AddedTextStore } from "../../../Store/AddedTextStore";


/**
 * 
 * @param currentText 
 * @param page 
 * @returns array of words in japanese, ready to work with db
 */

export const jp = async(currentText:string,page:number)=>{
    const paragraphsPerPage = LS.getParagraph();
    let jpWords:string[]= [];
    

    const rawJpArr = currentText.split(Regs.SelectNewStringSign)
    .filter((a,i)=>(page==0? i>=0 &&i<=(paragraphsPerPage-1)  
         :   i>=((page-1)*paragraphsPerPage)&&
         i<=((page)*paragraphsPerPage)-1)) ||[];

    jpWords = await JpnTextSplitter(([] as string[]).concat(...rawJpArr).join(""))
    

    return jpWords;
}