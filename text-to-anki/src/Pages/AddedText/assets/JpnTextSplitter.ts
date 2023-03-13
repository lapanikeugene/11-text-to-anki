/**
 * Japanese only! split string to array of japanese words 
 * @param text string in Japanase
 * @return array of japanese words.
 */
export const JpnTextSplitter = async(text:string)=>{
    const segments =  new Intl.Segmenter('jp', { granularity: 'word' });
    const iterator1 =await segments.segment(text);
    return Array.from(iterator1).map(obj=>Object.values(obj.segment).join(""));

}