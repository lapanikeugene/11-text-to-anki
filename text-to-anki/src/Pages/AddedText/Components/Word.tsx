
const Word = (params:{word:string})=>{
    //  [] are used to define a character set
    // \w word
    // \s whitespace
    // g global
    // ^ not
    const marksReg = /[^\w\s']/g;
    const punctuationalMarks = params.word.match(marksReg);

    return(<>
    <span className=" bg-slate-400 rounded-md py-1 px-2 cursor-pointer hover:font-bold">
        {params.word.replace(marksReg,"")}
    </span>
        {punctuationalMarks} 
    </>)
}


export default Word;