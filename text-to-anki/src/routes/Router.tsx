import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routsLinks } from "./routsLinks";

const AddNewText = React.lazy(()=>import("../Pages/AddNewText/AddNewText"));


const SiteRoute = ()=>{


    return (
        <Suspense fallback={"Loading..."}>
        <Routes>
            <Route path={routsLinks.NEW_TEXT} element={<AddNewText />} />
        </Routes>
        </Suspense>
    )
}



export default SiteRoute;