import {describe} from  '@jest/globals';
import { WordsModel } from '../db/WordsDB/WordsModel';
import {wordsInDb} from "../db/WordsDB/connectWordDB"

describe("Words DB tests",()=>{
    test("Add word without any other information to DB",async()=>{
        expect(typeof await WordsModel.addWord("test")).toBe('number');
    })
    test("select word from DB by word", async()=>{
        await WordsModel.addWord("test")
    
        expect(await WordsModel.getWord("test")).toBeInstanceOf(Object);
        expect(await WordsModel.getWord("test")).toHaveProperty('word');
        expect(await WordsModel.getWord("test")).toHaveProperty('translate');
        expect(await WordsModel.getWord("test")).toHaveProperty('level');
        expect(await WordsModel.getWord("test")).toHaveProperty('comment');
           
        });

})
