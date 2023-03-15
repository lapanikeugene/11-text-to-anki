/**
 * first setup of local storage
 */
export const SettingsLocalStorageSetup = ()=>{
    let defParagraphs = localStorage.getItem('settings-paragraphs-per-page');
    let defFontSize  = localStorage.getItem('settings-font-size');
    if(!defParagraphs){
        localStorage.setItem('settings-paragraphs-per-page','5');
    }

    if(!defFontSize){
        localStorage.setItem('settings-font-size','text-base');

      }

}