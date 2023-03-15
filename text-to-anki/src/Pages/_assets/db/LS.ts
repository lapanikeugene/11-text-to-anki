import { LocalStorageVars } from "./LocalStorageVars";
/**
 * work with local storage
 */
export class ls{



    getFontSize(){
        return localStorage.getItem(LocalStorageVars.FONT_SIZE);
    }

    getParagraph(){
        return Number(localStorage.getItem(LocalStorageVars.PARAGRAPHS_PER_PAGE))||5;
    }

}


export const LS = new ls()