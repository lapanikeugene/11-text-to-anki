import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routsLinks } from "./routsLinks";

const AddNewText    = React.lazy(()=>import("../Pages/AddNewText/AddNewText"));
const MainPage      = React.lazy(()=>import("../Pages/MainPage/MainPage"));
const AddedText      = React.lazy(()=>import("../Pages/AddedText/AddedText"));
const AllTexts      = React.lazy(()=>import("../Pages/AllTexts/AllTexts"));

const SiteRoute = ()=>{


    return (
        <Suspense fallback={"Loading..."}>
        <Routes>
            <Route path={routsLinks.NEW_TEXT} element={<AddNewText />} />
            <Route path={routsLinks.MAIN_PAGE} element={<MainPage />} />
            <Route path={routsLinks.ADDED_TEXT} element={<AddedText />} />
            <Route path={routsLinks.ALL_TEXT} element={<AllTexts />} />
        </Routes>
        </Suspense>
    )
}



export default SiteRoute;