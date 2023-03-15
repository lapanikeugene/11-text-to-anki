import { textDB } from "../connectDB";

/**
 * connect to indexedDB
 * TODO: Add asyncs and awaits. 
 */
export class indexdb {

    /**
     * Add nex text to db
     * @param title 
     * @param content 
     * @param lang 
     * @returns id of added text
     */
    addToDB(title:string="", content:string="",lang:string="eng"){
        const id = textDB.texts.add({title,content,lang});
        return id; 
    }

    /**
     * 
     * @returns array of all texts
     */

    getAllTexts(){
        const texts = textDB.texts.toArray();
        return texts;
    }


    async getTextByTitle(title:string){
        const text = await textDB.texts.get({title}) ||{id:-1,word:"not found",translate:"",level:-1,comment:""};
        return text.id;
 
    }

    getText(id:number){
        const text = textDB.texts.get(id);
        return text;
    }

    deleteText(id:number){
        textDB.texts.delete(id);
    }

    updateText(id:number=-1,title:string="",content:string=""){
        textDB.texts.update(id,{title,content})
    }
} 


export const IndexDB = new indexdb();