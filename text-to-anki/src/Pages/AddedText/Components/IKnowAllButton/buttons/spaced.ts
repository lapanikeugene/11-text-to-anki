import { useTextStore } from "../../../../states/textStore";
import { PageFilter } from "../../../assets/PageFilter";
import { AddedTextStore } from "../../../Store/AddedTextStore";

export const spaced = ()=>{
    const currentText = useTextStore(s=>s.currentText);
    const page =  AddedTextStore(s=>s.page)
    const marksReg = /[^\w\s']/g;
    return PageFilter(currentText.split(/\r?\n/),page)
                        .join(' ')
                        .replaceAll(/\s+/g, ' ')
                        .trim()
                        .replaceAll(marksReg,'')
                        .toLocaleLowerCase()
                        .split(" ");

}