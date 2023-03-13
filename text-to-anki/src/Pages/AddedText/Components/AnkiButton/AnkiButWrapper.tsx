import { WordsModel } from "../../../../db/WordsDB/WordsModel";
import { useTextStore } from "../../../states/textStore";
import { FormStyles } from "../../../_assets/css/FormStyles"
import { TextStyles } from "../../../_assets/css/TextStyles"
import { PageFilter } from "../../assets/PageFilter";
import { AddedTextStore } from "../../Store/AddedTextStore";
import { JapanWords } from "./assets/JapanWords";
import { SpacedWords } from "./assets/SpacedWords";

const AnkiButWrapper = ()=>{
    //baby factory pattern, think about future languages. 
    const langs =  {'jpn':JapanWords,
                    'spaced':SpacedWords};

    const page = AddedTextStore(s=>s.page);
    const {currentText,currentLang,currentTitle} = useTextStore(s=>s)
    
    const handleAnki=async()=>{
        
        const words = await langs[currentLang ==='jpn' ? 'jpn' : 'spaced'](currentText,page)

        const rawData = await WordsModel.getWordsWithTranslations(words);
        console.log(rawData);

        const csvData =  []
        for(const x of rawData){
            csvData.push([x.word,x.translate]);
        }
        
                
                // Convert the data to a CSV format string
        const csvString = csvData.map(row => row.join(",")).join("\n");

        // Create a Blob object with the CSV data
        const blob = new Blob([csvString], { type: "text/csv" });

        // Create a URL to the Blob object
        const url = URL.createObjectURL(blob);

        // Create a link element with the URL and filename
        const link = document.createElement("a");
        link.href = url;
        link.download = currentTitle+"_anki.csv";

        // Trigger a click on the link to download the file
        link.click();
    }  

    return(<>
    <button className={FormStyles.buttonStyle} onClick={handleAnki}>Download deck for ANKI</button>
                <p className={TextStyles.fontStyle}>
                    Only words of this page with <strong>translations</strong> will be added to anki deck. <br/>
                    <strong>how to add:</strong> simply drag file by mouse and drop it on anki window. Or import it. 
                </p>
    </>)
}


export default AnkiButWrapper