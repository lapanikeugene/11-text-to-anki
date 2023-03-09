import { wordDB } from "./connectWordDB";



export class wordsModel {


    addWord(word:string){
        return wordDB.words.add({
            word: word.toLocaleLowerCase(),
            translate: "",
            level: 0,
            comment: ""
        })
    }

    getWord(word:string){
        return wordDB.words.get({word: word.toLocaleLowerCase()});
    }

    async updateLevel(word:string,level:number){
        const element = await this.getWord(word);  
        wordDB.words.update(element?.id || -1,{level})

    }
}






export const WordsModel = new wordsModel();