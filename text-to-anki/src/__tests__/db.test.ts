import {describe} from  '@jest/globals';
import { textInDb } from '../db/connectDB';
import { IndexDB } from '../db/indexdb/indexdb';

describe("DB tests",()=>{
    test("Add value to DB",async()=>{
        expect(typeof  await IndexDB.addToDB("test","test")).toBe('number');
    })

    test("get all texts from DB", async()=>{
        const texts:textInDb[] = await IndexDB.getAllTexts();
        texts.forEach(text=>{
          expect(typeof text.content).toBe('string');
          expect(typeof  text.title).toBe('string');
        })

    })

    test("update db", async()=>{
        const id = await IndexDB.addToDB("test3","text of test3");
        const title="udpated titel of test 3";
        const content="updated content of test 3";
        await IndexDB.updateText(id,title,content);
        expect(await IndexDB.getText(id)).toMatchObject({id, title,content})

    })

    test("delete record from db", async()=>{
        const id = await IndexDB.addToDB("test4","text of test4");
        await IndexDB.deleteText(id);
        expect(await IndexDB.getText(id)).toBeUndefined();

    })
})