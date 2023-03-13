import { PageFilter } from "../../../assets/PageFilter";

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