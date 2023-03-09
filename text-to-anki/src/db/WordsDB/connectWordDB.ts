import Dexie, {Table} from "dexie"

export interface wordsInDb{
    id?:number,
    word:string,
    translate:string,
    level:number,
    comment:string,
}

export class TextDexie extends Dexie
{
    words:Dexie.Table<wordsInDb, number> ;

    constructor(){
        super("myWords");
        this.version(1).stores({words:'++id,word,translate,comment,level'});
        this.words = this.table('words');

    }
}
export const wordDB = new TextDexie();


