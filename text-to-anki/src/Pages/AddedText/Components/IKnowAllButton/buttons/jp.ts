import { useTextStore } from "../../../../states/textStore";
import { LS } from "../../../../_assets/db/LS";
import { Regs } from "../../../../_assets/helpers/Regs";
import { JpnTextSplitter } from "../../../assets/JpnTextSplitter";
import { AddedTextStore } from "../../../Store/AddedTextStore";


export const jp = async()=>{
    const currentText = useTextStore(s=>s.currentText);
    const page =  AddedTextStore(s=>s.page)
    const paragraphsPerPage = LS.getParagraph();
    let jpWords:string[]= [];
    
    const rawJpArr = currentText.split(Regs.SelectNewStringSign)
    .filter((a,i)=>(page==0? i>=0 &&i<=(paragraphsPerPage-1)  
         :   i>=((page-1)*paragraphsPerPage)&&
         i<=((page)*paragraphsPerPage)-1)) ||[];

    jpWords = await JpnTextSplitter(([] as string[]).concat(...rawJpArr).join(""))
    

    return jpWords;
}