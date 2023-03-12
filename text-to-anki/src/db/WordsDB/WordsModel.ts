import { wordDB, wordsInDb } from "./connectWordDB";



export class wordsModel {

    async  setTranslate(word:string, translate:string){
        const element = await this.getWord(word);  
        const response = await wordDB.words.update(element?.id || -1,{translate})
        console.log("response from db",response,element.id,translate);

    }

    async addWord(word:string){
        return await wordDB.words.add({
            word: word.toLocaleLowerCase(),
            translate: "",
            level: 0,
            comment: ""
        })
    }

    async getWord(word:string):Promise<wordsInDb>{
        return await wordDB.words.get({word: word.toLocaleLowerCase()}) ||{word:"not found",translate:"",level:-1,comment:""};
    }

    /**
     * update level of word from 0 to 4
     * @param word 
     * @param level 
     */
    async updateLevel(word:string,level:number){
        const element = await this.getWord(word);  
        await wordDB.words.update(element?.id || -1,{level})

    }

    async getWordsAmountByLevel(words:string[],level:number){
        return await wordDB.words.where('word').anyOf(words).and(item=>item.level===level).count();
    } 

    async DeleteTranslation(word:string){
        return await wordDB.words.where('word').equals(word).modify((l:wordsInDb)=>l.translate="");
    }

    async getWordsWithTranslations(words:string[]){

        return await wordDB.words.where('word').anyOf(words).and(item=>item.translate.length>0).toArray();
    }

    async setMassLevel(words:string[],level:number=0){
        console.log(words,level);
        await wordDB.words.where('word').anyOf(words).modify((l:wordsInDb)=>l.level=level)
    }
}






export const WordsModel = new wordsModel();