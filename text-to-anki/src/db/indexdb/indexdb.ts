import { textDB } from "../connectDB";


export class indexdb {


    addToDB(title:string="", content:string="",lang:string="eng"){
        const id = textDB.texts.add({title,content,lang});
        return id; 
    }

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