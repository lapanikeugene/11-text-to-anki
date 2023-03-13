import { LocalStorageVars } from "../../_assets/db/LocalStorageVars"
/**
 * break array of string into pages.
 * @param text array of string
 * @param currentPage 
 * @returns text related to current page
 */
export const PageFilter=(text:string[],currentPage:number)=>{
    const paragraphsPerPage = Number(localStorage.getItem(LocalStorageVars.PARAGRAPHS_PER_PAGE));

    return text.filter((a,i)=>(currentPage==0? i>=0 &&i<=(paragraphsPerPage-1)  
    :   i>=((currentPage-1)*paragraphsPerPage)&&
    i<=((currentPage)*paragraphsPerPage)-1)) ||[]




}