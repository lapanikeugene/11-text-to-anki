import { useEffect, useState } from "react"

/**
 * connection to indexed db of browser. 
 * @returns new db connection; 
 */
export const useDBConnection = (init:number)=>{
    const [currentDB,setCurrentConnection] = useState<IDBDatabase>();
    const [requestToDB,setRequest]  = useState<IDBOpenDBRequest>();
    const [curDBVersion,setVer] = useState(init);

    useEffect(()=>{
        console.log(requestToDB?.readyState);

    },[requestToDB?.readyState])
    
    const openNewDB = ()=>{
        console.log("update db to",1);
        console.log(curDBVersion);
        let openDB = indexedDB.open("db",curDBVersion);
        setRequest(openDB);

        console.log("i got next response",openDB);
        openDB.onsuccess= ()=>{
            console.log("connected to indexedDB",openDB);

            setCurrentConnection(openDB.result);
            openDB.result.close();

        }
        openDB.onerror =e=>{
            console.log("connection to db error...",e.target);
        }
    }
    const updateVersionDB = ()=>{
        // currentDB?.close();
        setVer(s=>++s);
       
    }

    useEffect(()=>{
        openNewDB();

    },[curDBVersion])
    return {currentDB,requestToDB,curDBVersion,updateVersionDB}
}