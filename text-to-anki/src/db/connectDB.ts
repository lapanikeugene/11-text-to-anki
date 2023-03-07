import Dexie, {Table} from "dexie"

export interface text{
    id?:number,
    title:string,
    content:string,
}

export class TextDexie extends Dexie
{
    texts:Dexie.Table<text, number> ;

    constructor(){
        super("myTexts");
        this.version(1).stores({texts:'++id,title,content'});
        this.texts = this.table('texts');

    }
}
export const textDB = new TextDexie();


