import Dexie, {Table} from "dexie"

export interface textInDb{
    id?:number,
    title:string,
    content:string,
    lang:string,
}

export class TextDexie extends Dexie
{
    texts:Dexie.Table<textInDb, number> ;

    constructor(){
        super("myTexts");
        this.version(1).stores({texts:'++id,title,content,lang'});
        this.texts = this.table('texts');

    }
}
export const textDB = new TextDexie();


