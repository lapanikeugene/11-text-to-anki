import { useEffect, useState } from "react";
import { AddedTextStore } from "../../../Store/AddedTextStore";

/**
 * get current page from AddedTextStore 
 * and update it if necessary. 
 * @returns current page
 */
export const useCurrentPage=()=>{
    const currentPage = AddedTextStore(s=>s.page);
    const [page,setPage] = useState(0);

    useEffect(()=>{
        setPage(currentPage)
    },[currentPage]);


    return [currentPage]




}