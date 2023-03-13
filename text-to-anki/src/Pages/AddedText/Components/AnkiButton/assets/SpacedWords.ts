import { PageFilter } from "../../../assets/PageFilter";


/**
 * 
 * @param text  string in any lang. with spaces
 * @param p current page
 * @returns array of words of current page. 
 */
export const SpacedWords = (text:string,p:number)=>{
    const marksReg = /[^\w\s']/g;

    return    PageFilter(text.split(/\r?\n/),p)
                        .join(' ')
                        .replaceAll(/\s+/g, ' ')
                        .trim()
                        .replaceAll(marksReg,'')
                        .toLocaleLowerCase()
                        .split(" ");

}