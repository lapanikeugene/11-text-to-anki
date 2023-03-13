import { JpnTextSplitter } from "../../../assets/JpnTextSplitter"
import { PageFilter } from "../../../assets/PageFilter"

/**
 * 
 * @param text string in japanese 
 * @param currentPage 
 * @returns array of words in japanese 
 */
export const JapanWords = async(text:string,currentPage:number)=>{
   

    const rawJpArr =PageFilter(  await JpnTextSplitter(text),currentPage)
    return ([] as string[]).concat(...rawJpArr)
}