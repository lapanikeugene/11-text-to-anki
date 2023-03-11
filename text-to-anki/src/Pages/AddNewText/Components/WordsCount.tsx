
/**
 * Component show words count 
 * @param params inputted text
 * @returns  component
 */
const WordsCount = (params:{text:string})=>{



    return( <span>
        Words Count: {params.text===""? 0 : (params.text.trim().split(" ").length ||0)}
      </span>
      )
}


export default WordsCount;