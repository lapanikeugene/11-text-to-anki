import { useEffect, useState } from "react"

/**
 * connection to indexed db of browser. 
 * @returns new db connection; 
 */
export const useDBConnection = ()=>{
    const [currentConnection,setCurrentConnection] = useState<IDBOpenDBRequest>();

    useEffect(()=>{
        let openDB = indexedDB.open("db");
        openDB.onsuccess= ()=>{
            console.log("connected to indexedDB");
            setCurrentConnection(openDB)

        }
        openDB.onerror =()=>{
            console.log("connection to db error...");
        }

    },[])


    return [currentConnection]
}