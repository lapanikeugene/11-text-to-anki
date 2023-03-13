import { Regs } from "../../../../_assets/helpers/Regs";
import { JpnTextSplitter } from "../../../assets/JpnTextSplitter"
import { PageFilter } from "../../../assets/PageFilter"

/**
 * 
 * @param text string in japanese 
 * @param currentPage 
 * @returns array of words in japanese 
 */
export const JapanWords = async(text:string,currentPage:number)=>{
    const splittedText = text.split(Regs.SelectNewStringSign);
    const textFromPage = PageFilter(splittedText,currentPage);
    const res =  await JpnTextSplitter(textFromPage.join(""));
    console.log(res);
    return res;
  
 
}