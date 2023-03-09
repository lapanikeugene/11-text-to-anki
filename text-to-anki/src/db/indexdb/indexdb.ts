import { textDB } from "../connectDB";


export class indexdb {


    addToDB(title:string="", content:string=""){
        const id = textDB.texts.add({title,content});
        return id; 
    }

    getAllTexts(){
        const texts = textDB.texts.toArray();
        return texts;
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